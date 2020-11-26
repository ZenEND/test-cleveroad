import { UiCard } from '@app/components/card'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { productsActions } from '@app/state/modules/products'
import { useShallowEqualSelector } from '@app/hooks/use-shallow-equal-selector'
import styles from './styles.module.scss'
import { UiLoader } from '@app/components/loader'
import { useLoadingState } from '@app/hooks/use-loading-state'
import { Link, useHistory } from 'react-router-dom'

export function GeneralPage() {
  const data = useShallowEqualSelector(state => state.products.data)
  const loading = useLoadingState([productsActions.get])
  const { push } = useHistory()
  const user = useShallowEqualSelector(state => state.user.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsActions.get())
  }, [dispatch])

  const list = useMemo(() => {
    if (!data) return null
    const items = []
    for (const [key, value] of Object.entries(data)) {
      console.log()
      const handleClick = () => user?.uid === value.userId && push(`/account/product/${key}`)
      items.push(
        <UiCard
          className={styles.card}
          title={value.title}
          description={value.description}
          price={value.price}
          onClick={handleClick}
          hoverable={user?.uid === value.userId}
          key={key}
        />
      )
    }
    return items.map(item => item)
  }, [data, push, user?.uid])

  return (
    <UiLoader className={styles.container} loading={loading}>
      <h1>General Page</h1>
      <Link to={'/account/product'}>Create new</Link>
      <div className={styles.cards}>{list}</div>
    </UiLoader>
  )
}
