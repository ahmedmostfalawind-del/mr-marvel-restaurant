export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type OrderType = 'delivery' | 'pickup' | 'dine-in'
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'
export type MenuCategory = 'pizza' | 'sandwich' | 'grill' | 'salad' | 'meal' | 'drink'

export interface CartItem {
  id: number
  name: string
  price: number
  qty: number
  emoji: string
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  items: CartItem[]
  total_price: number
  order_type: OrderType
  status: OrderStatus
  address?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Reservation {
  id: string
  customer_name: string
  customer_phone: string
  reservation_date: string
  reservation_time: string
  guests_count: string
  occasion: string
  status: ReservationStatus
  notes?: string
  created_at: string
}

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: MenuCategory
  image_url?: string
  badge?: string
  is_available: boolean
  is_featured: boolean
  sort_order: number
}
