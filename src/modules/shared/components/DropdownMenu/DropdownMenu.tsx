import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Delete, Edit, MoreHoriz, Visibility } from '@mui/icons-material'
import { ListItemIcon, ListItemText } from '@mui/material'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation'

export default function DropdownMenu({ onAction }) {
  const options = [
    { label: 'View', icon: <Visibility />, action: 'view' },
    { label: 'Edit', icon: <Edit />, action: 'edit' },
    { label: 'Delete', icon: <Delete />, action: 'delete' },
  ]

  const [showConfirmDelete, setShowConfirmDelete] = React.useState(false)

  const ITEM_HEIGHT = 40
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (action: string) => {
    setAnchorEl(null)
    if (action === 'delete') {
      setShowConfirmDelete(true)
    } else if (action && onAction) {
      onAction(action)
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
        onClose={handleClose}
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
            <ListItemIcon color="#203FC7">{option.icon}</ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <DeleteConfirmation
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={() => {
          if (onAction) onAction('delete')
          setShowConfirmDelete(false)
        }}
      />
    </>
  )
}
