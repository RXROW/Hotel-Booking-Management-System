import { Box, Typography } from '@mui/material'

function Commonheader() {
  return (
    <>
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        Stay
        <Box component="span" sx={{ color: 'text.primary' }}>
          cation.
        </Box>
      </Typography>
    </>
  )
}
export default Commonheader
