import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { userActions } from '@app/state/modules/user'
import { UiLoader } from '@app/components/loader'
import { useLoadingState } from '@app/hooks/use-loading-state'
import { Link, useHistory } from 'react-router-dom'
import { useCallback } from 'react'
import { AsyncDispatch } from '@app/state/interfaces'

export function SignInPage() {
  const loading = useLoadingState([userActions.signIn])
  const { push } = useHistory()
  const dispatch = useDispatch<AsyncDispatch>()
  const onFinish = useCallback(
    async (values: FormValues) => {
      await dispatch(userActions.signIn(values))
      push('/account')
    },
    [dispatch, push]
  )

  return (
    <UiLoader loading={loading}>
      <h2>Sign In</h2>
      <Form onFinish={onFinish}>
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
          <Link to={'/sign-up'}>Have not account? Sign-up</Link>
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

interface FormValues {
  email: string
  password: string
}
