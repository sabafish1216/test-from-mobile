import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import CreatePaymentDialog from './features/payments/CreatePaymentDialog'
import PaymentCard from './features/payments/PaymentCard'
import { selectLoginUser } from './features/auth/authSlice'
import { selectUsers } from './features/users/usersSlice'
import { addPayment, selectCurrency, selectPayments } from './features/payments/paymentsSlice'

function App() {
  const dispatch = useDispatch()
  const payments = useSelector(selectPayments)
  const currency = useSelector(selectCurrency)
  const users = useSelector(selectUsers)
  const loginUser = useSelector(selectLoginUser)

  const [open, setOpen] = useState(false)

  const usersById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users])

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Payment Manager
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            支払い作成
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            ログイン中: {loginUser?.name}（{loginUser?.email}）
          </Typography>

          <Stack spacing={2}>
            {payments.length === 0 ? (
              <Typography color="text.secondary">
                まだ支払いがありません。「支払い作成」から追加してください。
              </Typography>
            ) : (
              payments.map((p) => (
                <PaymentCard
                  key={p.id}
                  payment={p}
                  usersById={usersById}
                  currency={currency}
                />
              ))
            )}
          </Stack>
        </Stack>
      </Container>

      <CreatePaymentDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(data) => {
          dispatch(
            addPayment({
              ...data,
              createdByUserId: loginUser?.id ?? null,
            }),
          )
          setOpen(false)
        }}
        users={users}
        loginUser={loginUser}
      />
    </Box>
  )
}

export default App
