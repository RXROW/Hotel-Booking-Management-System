import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
} from '@mui/material'

interface Column {
  id: string
  label: string
  render?: (row: any) => React.ReactNode
}

interface SharedTableProps {
  columns: Column[]
  rows: any[]
  count: number
  page: number
  size: number
  loading: boolean
  onPageChange: (event: unknown, newPage: number) => void
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  footerActionComponent?: React.ReactNode
}

const SharedTable: React.FC<SharedTableProps> = ({
  columns,
  rows,
  count,
  page,
  size,
  loading,
  onPageChange,
  onRowsPerPageChange,
  footerActionComponent,
}) => {
  return (
    <TableContainer
      sx={{ border: 'none' }}
      // component={Paper}
    >
      <Table sx={{ border: 'none' }}>
        <TableHead
          sx={{
            backgroundColor: '#E2E5EB',
            height: '90px',
            border: 'none',
            textAlign: 'center',
          }}
        >
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={col.id}
                sx={{
                  ...(index === 0 && {
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px',
                  }),
                  ...(index === columns.length - 1 && {
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                  }),
                  backgroundColor: '#E2E5EB',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody sx={{ textAlign: 'center' }}>
          {loading ? (
            <TableRow sx={{ border: 'none', textAlign: 'center' }}>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f9f9f9' }}
              >
                {columns.map((col) => (
                  <TableCell
                    sx={{ border: 'none', textAlign: 'center' }}
                    key={col.id}
                  >
                    {col.render ? col.render(row) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography>No data available</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length} sx={{ border: 'none' }}>
              <Box display="flex" justifyContent="center">
                <TablePagination
                  sx={{ border: 'none' }}
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  count={count}
                  rowsPerPage={size}
                  page={page}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  ActionsComponent={() => <>{footerActionComponent}</>}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default SharedTable
