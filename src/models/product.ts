export interface ProductModel {
  title: string
  description: string
  price: number
  discount?: number
  discountEndDate?: Date
  userId: string
}
