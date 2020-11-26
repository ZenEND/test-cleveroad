import { Spin } from 'antd'
import { PropsWithChildren } from 'react'
import { SpinProps } from 'antd/lib/spin'

export function UiLoader({
  children,
  loading,
  className,
  ...props
}: PropsWithChildren<Omit<SpinProps, 'spinning'> & { loading?: boolean }>) {
  return (
    <Spin size={'large'} spinning={loading} {...props} className={className}>
      {children}
    </Spin>
  )
}
