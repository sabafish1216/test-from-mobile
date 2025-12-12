import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

export default function CreatePaymentDialog({
  open,
  onClose,
  onCreate,
  users,
  loginUser,
}) {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const [targetUserIds, setTargetUserIds] = useState([])
  const [amount, setAmount] = useState('')

  const availableUsers = useMemo(() => {
    const loginUserId = loginUser?.id
    return (users ?? []).filter(
      (u) => u.id !== loginUserId && !targetUserIds.includes(u.id),
    )
  }, [users, loginUser, targetUserIds])

  const selectedUsers = useMemo(() => {
    const byId = new Map((users ?? []).map((u) => [u.id, u]))
    return targetUserIds.map((id) => byId.get(id)).filter(Boolean)
  }, [users, targetUserIds])

  const canSubmit =
    title.trim().length > 0 && amount !== '' && !Number.isNaN(Number(amount))

  const reset = () => {
    setTitle('')
    setMemo('')
    setTargetUserIds([])
    setAmount('')
  }

  const handleClose = () => {
    reset()
    onClose?.()
  }

  const handleCreate = () => {
    if (!canSubmit) return
    onCreate?.({
      title: title.trim(),
      memo: memo.trim(),
      targetUserIds,
      amount: Number(amount),
    })
    reset()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>支払い作成</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
            inputProps={{ maxLength: 80 }}
          />

          <TextField
            label="メモ（任意）"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            multiline
            minRows={3}
          />

          <FormControl>
            <InputLabel id="payment-target-label">対象</InputLabel>
            <Select
              labelId="payment-target-label"
              multiple
              value={targetUserIds}
              label="対象"
              input={<OutlinedInput label="対象" />}
              onChange={(e) => setTargetUserIds(e.target.value)}
              renderValue={() => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {selectedUsers.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      選択されていません（自分以外から複数選択）
                    </Typography>
                  ) : (
                    selectedUsers.map((u) => (
                      <Chip
                        key={u.id}
                        label={u.name}
                        onDelete={() =>
                          setTargetUserIds((prev) =>
                            prev.filter((id) => id !== u.id),
                          )
                        }
                        size="small"
                      />
                    ))
                  )}
                </Box>
              )}
            >
              {availableUsers.length === 0 ? (
                <MenuItem disabled value="">
                  これ以上選択できません
                </MenuItem>
              ) : (
                availableUsers.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}（{u.email}）
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            label="金額"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            inputProps={{ min: 0, step: 1 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleCreate} variant="contained" disabled={!canSubmit}>
          作成
        </Button>
      </DialogActions>
    </Dialog>
  )
}

