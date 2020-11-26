import { Layout } from 'antd'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

const { Header, Content } = Layout

interface Props {
  children?: ReactNode
}

export function UiLayout({ children }: Props) {
  return (
    <Layout className={styles.layout}>
      <Header className="header">
        <h1>Cleveroad Test</h1>
      </Header>
      <Layout className={styles.layoutContent}>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export function ExternalLayout({ children }: Props) {
  return (
    <Layout className={styles.externalLayout}>
      <Content className={styles.externalContent}>{children}</Content>
    </Layout>
  )
}
