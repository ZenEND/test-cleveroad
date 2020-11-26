import { Button, DatePicker, Form, Input, InputNumber } from 'antd'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ProductModel } from '@app/models/product'
import { productsActions } from '@app/state/modules/products'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useShallowEqualSelector } from '@app/hooks/use-shallow-equal-selector'
import { useLoadingState } from '@app/hooks/use-loading-state'
import { UiLoader } from '@app/components/loader'
import moment from 'moment'

export function ProductPage() {
  const dispatch = useDispatch()
  const { params } = useRouteMatch<{ id?: string }>()
  const data = useShallowEqualSelector(store => store.products.data)
  const loading = useLoadingState([productsActions.get, productsActions.create, productsActions.update])
  const [form] = Form.useForm()
  const { push } = useHistory()
  const user = useShallowEqualSelector(state => state.user.data)

  useEffect(() => {
    // This functions used to change initial values in form
    if (data && params.id && data[params.id]) form.setFieldsValue(data[params.id])
  }, [data, form, params.id])

  useEffect(() => {
    if (params.id) dispatch(productsActions.get())
  }, [dispatch, params.id])

  const initialValues = useMemo(
    () =>
      params.id && data
        ? data[params.id]
        : {
            title: '',
            price: '',
            description: '',
            discount: null,
            discountEndDate: null,
          },
    [data, params.id]
  )

  const handleSubmit = useCallback(
    async (values: ProductModel) => {
      params.id
        ? await dispatch(productsActions.update({ [params.id]: { ...values, userId: user?.uid as string } }))
        : await dispatch(productsActions.create({ ...values, userId: user?.uid as string }))
      push('/account')
    },
    [dispatch, params.id, push, user?.uid]
  )

  return (
    <UiLoader loading={loading}>
      <h1>Product Page</h1>
      <Form initialValues={initialValues} onFinish={handleSubmit} form={form}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Title is required!' }]} shouldUpdate>
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Description is required!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Price is required!' }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Discount"
          name="discount"
          rules={[{ max: 99, min: 10, type: 'number', message: 'Min 10 and max 99 percents' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Discount End Date"
          name="discountEndDate"
          rules={[
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!getFieldValue('discount') || value) {
                  return Promise.resolve()
                }
                return Promise.reject('Discount End Date is required!')
              },
            }),
          ]}
        >
          <DatePicker format="YYYY-MM-DD" disabledDate={current => current < moment().endOf('day').add(-1, 'days')} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </UiLoader>
  )
}

// Прототипы и наследование
