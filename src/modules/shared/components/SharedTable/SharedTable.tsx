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
  useTheme,
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
  const theme = useTheme()
  return (
    <TableContainer
      sx={{ border: 'none' }}
      // component={Paper}
    >
      <Table sx={{ border: 'none' }}>
        <TableHead
          sx={{
            backgroundColor:
              theme.palette.mode === 'light' ? '#E2E5EB' : '#1e1e1e',
            height: '90px',
            textAlign: 'center',
            transition: 'all 0.3s linear',
            borderBottom: '2px solid #E2E5EB',
          }}
        >
          <TableRow>
            {columns?.map((col, index) => (
              <TableCell
                key={col.id}
                sx={{
                  ...(index === 0 && {
                    borderTopLeftRadius: '12px',
                  }),
                  ...(index === columns.length - 1 && {
                    borderTopRightRadius: '12px',
                  }),
                  backgroundColor:
                    theme.palette.mode === 'light' ? '#E2E5EB' : '#1e1e1e',
                  color: theme.palette.mode === 'light' ? '#152C5B' : '#fff',
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
          ) : rows?.length > 0 ? (
            rows?.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? idx % 2 === 0
                        ? 'white'
                        : '#f9f9f9'
                      : idx % 2 === 0
                        ? '#1e1e1e'
                        : '#252525',
                  '&:hover': {
                    backgroundColor:
                      theme.palette.mode === 'light' ? '#f5f5f5' : '#333',
                  },
                  transition: 'background-color 0.3s linear',
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    sx={{
                      border: 'none',
                      textAlign: 'center',
                      color:
                        theme.palette.mode === 'light' ? '#152C5B' : '#fff',
                    }}
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
