import { Form, Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { userActions } from '@app/state/modules/user'
import { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UiLoader } from '@app/components/loader'
import { useLoadingState } from '@app/hooks/use-loading-state'

export function SignUpPage() {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const loading = useLoadingState([userActions.signIn])

  const onFinish = useCallback(
    async (values: any) => {
      await dispatch(userActions.signUp(values))
      push('/account')
    },
    [dispatch, push]
  )

  return (
    <UiLoader loading={loading}>
      <h2>Sign Up</h2>
      <Form initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <p>
          <Link to={'/'}>Back to sign-in</Link>
        </p>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </UiLoader>
  )
}
