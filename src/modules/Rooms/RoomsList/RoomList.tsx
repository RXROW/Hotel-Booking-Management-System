// @ts-nocheck
import { useEffect, useState } from 'react'
import * as React from 'react'
import { Box } from '@mui/material'
import { privateInstance } from '../../../services/apis/apisConfig'
import { ROOMS_URL } from '../../../services/apis/apisUrls'
import ReusableModal from '../../shared/components/ResuableView/ReusableModal'
import { useNavigate } from 'react-router-dom'
import SharedTable from '../../shared/components/SharedTable/SharedTable'
import TableHeader from '../../shared/components/TableHeader/TableHeader'
import DropdownMenu from '../../shared/components/DropdownMenu/DropdownMenu'
import { useAuthContext } from '../../../Context/AuthContext'
import TablePaginationActions from '../../shared/components/TablePaginationActions/TablePaginationActions'
import DeleteConfirmation from '../../shared/components/DeleteConfirmation/DeleteConfirmation'
import {
  Column,
  Room,
  HandleActionProps,
} from '../../../interfaces/Roomsinterface'
import ViewModal from '../../shared/components/ViewModal/ViewModal'
function RoomList() {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [selectedRoom, setselectedRoom] = useState<Room | null>(null)
  const [RoomDeleteId, setRoomDeleteId] = useState<string>('')
  const navigate = useNavigate()
  const [openViewModal, setOpenViewModal] = useState(false)
  const { Rooms, count, page, setSize, setPage, size, loading, fetchRooms } =
    useAuthContext()
  // console.log( page, size, loading);
  console.log(Rooms, page, size, loading)

  const handleDeletetRoom = async (): Promise<void> => {
    if (!RoomDeleteId) return
    try {
      await privateInstance.delete(ROOMS_URL.DELETE_ROOM(RoomDeleteId))
      fetchRooms({ size, page })
      setOpenDeleteModal(false)
    } catch (error) {
      console.log(error || 'Failed to delete rooom')
    }
  }
  const handleAction = (action: string, room: Room) => {
    setselectedRoom(room)
    if (action === 'view') {
      setOpenViewModal(true)
    } else if (action === 'edit') {
      navigate(`/dashboard/rooms/${room?._id}`)
    } else if (action === 'delete') {
      setRoomDeleteId(room?._id)
      setOpenDeleteModal(true)
    }
  }
  const handleCloseModal = (): void => {
    setOpenViewModal(false)
  }
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage)
    fetchRooms({ size, page: newPage })
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10)
    setSize(newSize)
    setPage(0)
    fetchRooms({ size: newSize === -1 ? count : newSize, page: 0 })
  }
  useEffect(() => {
    fetchRooms({ page, size })
  }, [page, size])
  const columns: Column[] = [
    {
      id: 'Room Numbers',
      label: 'Room Numbers',
      render: (row: Room) => row?.roomNumber,
    },
    {
      id: 'Images',
      label: 'Images',
      render: (row: Room) => (
        <>
          <img
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '5px',
              objectFit: 'cover',
            }}
            src={row?.images?.[0]}
          />
          ,
        </>
      ),
    },
    {
      id: 'Price',
      label: 'Price',
      render: (row: Room) => row?.price,
    },
    {
      id: 'Discount',
      label: 'Discount',
      render: (row: Room) => row?.discount,
    },
    {
      id: 'Capacity',
      label: 'Capacity',
      render: (row: Room) => row?.capacity,
    },
    {
      id: 'createdBy',
      label: 'createdBy',
      render: (row: Room) => row.createdBy?.userName ?? 'N/A',
    },
    {
      id: 'actions',
      label: '',
      render: (row: Room) => (
        <DropdownMenu
          facility={row}
          onAction={(action: string) => handleAction(action, row)}
        />
      ),
    },
  ]
  return (
    <Box>
      <TableHeader HeaderText="Rooms" TextButton="Room" />
      <SharedTable
        columns={columns}
        rows={Rooms}
        count={count}
        page={page}
        size={size}
        loading={loading}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        footerActionComponent={
          <TablePaginationActions
            count={count}
            page={page}
            rowsPerPage={size}
            onPageChange={handlePageChange}
          />
        }
      />
      <DeleteConfirmation
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setRoomDeleteId(null)
        }}
        onConfirm={handleDeletetRoom}
        title="Delete Room"
        message="Are you sure you want to delete this Room?"
      />
      <ReusableModal
        open={openViewModal}
        onClose={handleCloseModal}
        details={selectedRoom}
      />
    </Box>
  )
}

export default RoomList
