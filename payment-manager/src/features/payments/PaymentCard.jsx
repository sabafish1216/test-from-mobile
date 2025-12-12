import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

export default function PaymentCard({ payment, usersById, currency }) {
  const createdAtLabel = payment?.createdAt
    ? new Date(payment.createdAt).toLocaleString('ja-JP')
    : '-'

  const amountLabel = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currency || 'JPY',
    maximumFractionDigits: 0,
  }).format(Number(payment?.amount) || 0)

  const targets =
    payment?.targetUserIds?.map((id) => usersById.get(id)).filter(Boolean) ?? []

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Typography variant="h6">{payment?.title || '-'}</Typography>
            <Typography variant="h6">{amountLabel}</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            作成日: {createdAtLabel}
          </Typography>

          <Divider />

          <Stack spacing={0.5}>
            <Typography variant="subtitle2">対象</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {targets.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  なし
                </Typography>
              ) : (
                targets.map((u) => <Chip key={u.id} label={u.name} size="small" />)
              )}
            </Stack>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="subtitle2">メモ</Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {payment?.memo?.trim() ? payment.memo : '（なし）'}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

