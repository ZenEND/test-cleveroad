import { Card } from 'antd'
import styles from './styles.module.scss'
import cn from 'classnames'
import { CardProps } from 'antd/lib/card'

interface Props extends CardProps {
  title: string
  description: string
  price: number
  className?: string
  id?: string
}

export function UiCard({ title, description, price, className, ...props }: Props) {
  return (
    <Card
      className={cn(styles.card, className)}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      {...props}
    >
      <h3>{title}</h3>
      <p className={styles.description}>{description}</p>
      <p>{price}</p>
    </Card>
  )
}
