// @ts-nocheck
import { Box } from '@mui/material'
import TableHeader from '../shared/components/TableHeader/TableHeader'
import SharedTable from '../shared/components/SharedTable/SharedTable'
import TablePaginationActions from '../shared/components/TablePaginationActions/TablePaginationActions'
import { useEffect, useState } from 'react'
import { privateInstance } from '../../services/apis/apisConfig'
import { ADS_URL, ROOMS_URL } from '../../services/apis/apisUrls'
import { adsResponse, adsDetails } from '../../interfaces/AdsInterfaces'
import DeleteConfirmation from '../shared/components/DeleteConfirmation/DeleteConfirmation'
import AdvertisementsForm from './AdvertisementsForm/AdvertisementsForm'
import ViewModal from '../shared/components/ViewModal/ViewModal'
import DropdownMenu from '../shared/components/DropdownMenu/DropdownMenu'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

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
  const [ads, setAds] = useState<adsDetails[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)

  const [selectedAd, setSelectedAd] = useState<adsDetails | null>(null)

  const [formModalOpen, setFormModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState<string>('')
  const [discount, setDiscount] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [adToDeleteId, setAdToDeleteId] = useState<number | null>(null)

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

  const handlePageChange = (_event: unknown, newPage: number) => {
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

  const handleSubmitAd = async () => {
    try {
      let res;
      if (isEditing && editingId) {
        res = await privateInstance.put(ADS_URL.UPDATE_ADS(Number(editingId)), {
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
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'An error occurred');
      console.log(error);
    }
  };

  const handleDeleteAd = async () => {
    if (!adToDeleteId) return
    try {
      await privateInstance.delete(ADS_URL.DELETE_ADS(Number(adToDeleteId)))
      setOpenDeleteModal(false)
      setAdToDeleteId(null)
      toast.success('Ad deleted successfully')
      getAds({ size, page })
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'An error occurred');
    }
  }

  const handleAction = (action: string, ad: adsDetails) => {
    setSelectedAd(ad)
    if (action === 'view') {
      setOpenViewModal(true)
    } else if (action === 'edit') {
      setSelectedRoomId(ad.room._id)
      setDiscount(ad.room.discount)
      setIsActive(ad.isActive)
      setEditingId(Number(ad._id))
      setIsEditing(true)
      setFormModalOpen(true)
    } else if (action === 'delete') {
      setAdToDeleteId(Number(ad._id))
      setOpenDeleteModal(true)
    }
  }

  const columns = [
    {
      id: 'roomNumber',
      label: 'Room Name',
      render: (row: adsDetails) => row.room.roomNumber,
    },
    {
      id: 'price',
      label: 'Price',
      render: (row: adsDetails) => `EGP ${row.room.price.toString()}`,
    },
    {
      id: 'discount',
      label: 'Discount',
      render: (row: adsDetails) => `${row.room.discount}%`,
    },
    {
      id: 'capacity',
      label: 'Capacity',
      render: (row: adsDetails) => row.room.capacity.toString(),
    },
    {
      id: 'isActive',
      label: 'Active',
      render: (row: adsDetails) => (row.isActive ? 'Yes' : 'No'),
    },
    {
      id: 'actions',
      label: '',
      render: (row: adsDetails) => (
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
