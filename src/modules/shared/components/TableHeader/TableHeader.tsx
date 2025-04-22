import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function TableHeader({ TextButton = 'Room', HeaderText = "Room" }) {
  return (
    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="h5" color="initial">
          {HeaderText} Table Details
        </Typography>
        <Typography variant="body2" color="initial">
          You can check all details
        </Typography>
      </Box>
      <Box>
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#203FC7',
            paddingInline: '20px',
            paddingBlock: '10px',
            borderRadius: '8px',
          }}
          to="/add-table"
        >
          Add New {TextButton}
        </Link>
      </Box>
    </Grid>
  )
}
