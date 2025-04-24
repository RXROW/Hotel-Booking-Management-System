import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Delete, Edit, MoreHoriz, Visibility } from '@mui/icons-material'
import { ListItemIcon, ListItemText } from '@mui/material'

export default function DropdownMenu({ facility, onAction }:any) {
  const options = [
    { label: 'View', icon: <Visibility sx={{color:"#0675cac7"}} />, action: 'view' },
    { label: 'Edit', icon: <Edit sx={{color:"#0675cac7"}} />, action: 'edit' },
    { label: 'Delete', icon: <Delete sx={{color:"#0675cac7"}} />, action: 'delete' },
  ]

  const ITEM_HEIGHT = 40
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (action?: string) => {
    setAnchorEl(null)
    if (action && onAction) {
      onAction(action,facility)
    }
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '15ch',
              borderRadius: '14px',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.action}
            onClick={() => handleClose(option.action)}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
