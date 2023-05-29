import { Stack } from '@mui/material'
import React from 'react'

function Pagination({ page, totalPage }) {
  return (
        <Stack spacing={2}>
          <Pagination page={page} count={totalPage} variant="outlined" shape="rounded" />
        </Stack>
  )
}

export default Pagination