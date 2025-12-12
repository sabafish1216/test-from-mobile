import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  currency: 'JPY',
  items: [],
}

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    addPayment: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare({ description, amount }) {
        return {
          payload: {
            id: nanoid(),
            description: String(description ?? '').trim(),
            amount: Number(amount),
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    removePayment(state, action) {
      state.items = state.items.filter((p) => p.id !== action.payload)
    },
    clearPayments(state) {
      state.items = []
    },
    setCurrency(state, action) {
      state.currency = action.payload
    },
  },
})

export const { addPayment, removePayment, clearPayments, setCurrency } =
  paymentsSlice.actions

export const selectPayments = (state) => state.payments.items
export const selectCurrency = (state) => state.payments.currency
export const selectTotalAmount = (state) =>
  state.payments.items.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)

export default paymentsSlice.reducer
