import { Box } from '@mui/material'
import TableHeader from '../shared/components/TableHeader/TableHeader'
import SharedTable from '../shared/components/SharedTable/SharedTable'
import TablePaginationActions from '../shared/components/TablePaginationActions/TablePaginationActions'
import { useEffect, useState } from 'react'
import { privateInstance } from '../../services/apis/apisConfig'
import { ADS_URL, ROOMS_URL } from '../../services/apis/apisUrls'
import { adsResponse, ad } from '../../interfaces/AdsInterfaces'
import DeleteConfirmation from '../shared/components/DeleteConfirmation/DeleteConfirmation'
import AdvertisementsForm from './AdvertisementsForm/AdvertisementsForm'
import ViewModal from '../shared/components/ViewModal/ViewModal'
import DropdownMenu from '../shared/components/DropdownMenu/DropdownMenu'
import { toast } from 'react-toastify'

const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

interface Room {
  _id: string
  roomNumber: string
  price: number
  capacity: number
  discount: number
}

export default function Advertisements() {
  const [ads, setAds] = useState<ad[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)

  const [selectedAd, setSelectedAd] = useState<ad | null>(null)

  const [formModalOpen, setFormModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')
  const [discount, setDiscount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [adToDeleteId, setAdToDeleteId] = useState<string | null>(null)

  const [openViewModal, setOpenViewModal] = useState(false)

  const getAds = async ({ size, page }: { size: number; page: number }) => {
    setLoading(true)
    try {
      const response = await privateInstance.get<adsResponse>(ADS_URL.GET_ADS, {
        params: { size, page: page + 1 },
      })
      setAds(response.data.data.ads || [])
      setCount(response.data.data.totalCount || 0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getRooms = async () => {
    try {
      const response = await privateInstance.get<{ data: { rooms: Room[] } }>(
        ROOMS_URL.GET_ROOMS,
      )
      setRooms(response.data.data.rooms || [])
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage)
    getAds({ size, page: newPage })
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10)
    setSize(newSize)
    setPage(0)
    getAds({ size: newSize === -1 ? count : newSize, page: 0 })
  }

  useEffect(() => {
    getAds({ size, page })
    getRooms()
  }, [size, page])


  // const handleSubmitAd = async () => {
  //   try {
  //     if (isEditing && editingId) {
  //       await privateInstance.put(ADS_URL.UPDATE_ADS(editingId), {
  //         room: selectedRoomId,
  //         discount,
  //         isActive,
  //       })
  //     } else {
  //       await privateInstance.post(ADS_URL.CREATE_ADS, {
  //         room: selectedRoomId,
  //         discount,
  //         isActive,
  //       })
  //     }

  //     setFormModalOpen(false)
  //     setSelectedRoomId('')
  //     setDiscount(0)
  //     setIsActive(false)
  //     setEditingId(null)
  //     getAds({ size, page })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleSubmitAd = async () => {
    try {
      let res;
      if (isEditing && editingId) {
        res = await privateInstance.put(ADS_URL.UPDATE_ADS(editingId), {
          room: selectedRoomId,
          discount,
          isActive,
        });
      } else {
        res = await privateInstance.post(ADS_URL.CREATE_ADS, {
          room: selectedRoomId,
          discount,
          isActive,
        });
      }
  
      toast.success(res?.data?.message || 'Operation successful');
  
      setFormModalOpen(false);
      setSelectedRoomId('');
      setDiscount(0);
      setIsActive(false);
      setEditingId(null);
      getAds({ size, page });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };
  

  const handleDeleteAd = async () => {
    if (!adToDeleteId) return
    try {
      await privateInstance.delete(ADS_URL.DELETE_ADS(adToDeleteId))
      setOpenDeleteModal(false)
      setAdToDeleteId(null)
      toast.success('Ad deleted successfully')
      getAds({ size, page })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAction = (action: string, ad: ad) => {
    setSelectedAd(ad)
    if (action === 'view') {
      setOpenViewModal(true)
    } else if (action === 'edit') {
      setSelectedRoomId(ad.room._id)
      setDiscount(ad.room.discount)
      setIsActive(ad.isActive)
      setEditingId(ad._id)
      setIsEditing(true)
      setFormModalOpen(true)
    } else if (action === 'delete') {
      setAdToDeleteId(ad._id)
      setOpenDeleteModal(true)
    }
  }

  const columns = [
    {
      id: 'roomNumber',
      label: 'Room Name',
      render: (row: ad) => row.room.roomNumber,
    },
    {
      id: 'price',
      label: 'Price',
      render: (row: ad) => `EGP ${row.room.price}`,
    },
    {
      id: 'discount',
      label: 'Discount',
      render: (row: ad) => `${row.room.discount}%`,
    },
    {
      id: 'capacity',
      label: 'Capacity',
      render: (row: ad) => row.room.capacity,
    },
    {
      id: 'isActive',
      label: 'Active',
      render: (row: ad) => (row.isActive ? 'Yes' : 'No'),
    },
    {
      id: 'actions',
      label: '',
      render: (row: ad) => (
        <DropdownMenu
          ad={row}
          onAction={(action: string) => handleAction(action, row)}
        />
      ),
    },
  ]

  return (
    <Box>
      <TableHeader
        HeaderText="Ads"
        TextButton="Ads"
        onClick={() => {
          setIsEditing(false)
          setSelectedRoomId('')
          setDiscount(0)
          setIsActive(false)
          setFormModalOpen(true)
        }}
      />

      <SharedTable
        columns={columns}
        rows={ads}
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

      {/* Form Modal for Add & Edit */}
      <AdvertisementsForm
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false)
          setSelectedRoomId('')
          setDiscount(0)
          setIsActive(false)
          setEditingId(null)
        }}
        onSubmit={handleSubmitAd}
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
        discount={discount}
        setDiscount={setDiscount}
        isActive={isActive}
        setIsActive={setIsActive}
        isEditing={isEditing}
      />

      {/* DeleteConfirmation Modal */}
      <DeleteConfirmation
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false)
          setAdToDeleteId(null)
        }}
        onConfirm={handleDeleteAd}
        title="Delete Advertisement"
        message="Are you sure you want to delete this advertisement?"
      />

      {/* View Modal */}
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="View Advertisement"
        data={{
          'Room Name': selectedAd?.room.roomNumber ?? 'No Name',
          Price: selectedAd?.room.price ? `EGP ${selectedAd.room.price}` : 'N/A',
          Discount: selectedAd?.room.discount
            ? `${selectedAd.room.discount}%`
            : 'N/A',
          Capacity: selectedAd?.room.capacity ?? 'N/A',
          Active: selectedAd?.isActive ? 'Yes' : 'No',
          'Created By': selectedAd?.createdBy?.userName ?? 'Unknown',
          'Created At': selectedAd?.createdAt
            ? formatDate(selectedAd.createdAt)
            : 'N/A',
        }}
      />
    </Box>
  )
}
