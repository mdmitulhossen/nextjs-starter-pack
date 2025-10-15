import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface Order {
  id: string
  name: string
  // Add more fields as needed
}

interface OrderStoreState {
  order: Order | null
  orders: Order[]
  isLoading: boolean
  error: string | null

  // Actions
  setOrder: (order: Order) => void
  setOrders: (orders: Order[]) => void
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  removeOrder: (id: string) => void
  clearOrders: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  order: null,
  orders: [],
  isLoading: false,
  error: null,
}

export const useOrderStore = create<OrderStoreState>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,

        setOrder: (order) =>
          set((state) => {
            state.order = order
          }),

        setOrders: (orders) =>
          set((state) => {
            state.orders = orders
          }),

        addOrder: (order) =>
          set((state) => {
            state.orders.push(order)
          }),

        updateOrder: (id, updates) =>
          set((state) => {
            const index = state.orders.findIndex((item) => item.id === id)
            if (index !== -1) {
              state.orders[index] = { ...state.orders[index], ...updates }
            }
          }),

        removeOrder: (id) =>
          set((state) => {
            state.orders = state.orders.filter((item) => item.id !== id)
          }),

        clearOrders: () =>
          set((state) => {
            state.orders = []
          }),

        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
          }),

        reset: () => set(initialState),
      })),
      {
        name: 'order-storage',
        // Optionally, you can specify which properties to persist
        // partialize: (state) => ({ orders: state.orders }),
      }
    ),
    {
      name: 'OrderStore',
    }
  )
)

// Selectors (optional but recommended)
export const selectOrder = (state: OrderStoreState) => state.order
export const selectOrders = (state: OrderStoreState) => state.orders
export const selectIsLoading = (state: OrderStoreState) => state.isLoading
export const selectError = (state: OrderStoreState) => state.error
