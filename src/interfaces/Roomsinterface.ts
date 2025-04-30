export interface Facility {
  _id: string
  userName: string
  name: string
}

export interface FormRoom {
  _id: number
  roomNumber: string
  price: number
  capacity: number
  discount: number
  imgs: File[]
  facilities: string[]
}

export interface Room {
  _id: string
  roomNumber: string
  price: number
  capacity: number
  discount: number
  images: string[]
  facilities: Facility[]
  createdBy: {
    _id: string
    userName: string
  }
}

export interface ImagePreview {
  url: string
  name: string
  file: File | null
  isExisting: boolean
}

export interface MenuProps {
  PaperProps: {
    style: {
      maxHeight: number
      width: number
    }
  }
}

export interface RoomsDataProps {
  roomid?: string
  isEdit?: boolean
}
export interface Column {
  id: string
  label: string
  render: (row: Room) => React.ReactNode
}

export interface TablePaginationProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: unknown, newPage: number) => void
}

export interface HandleActionProps {
  action: 'view' | 'edit' | 'delete'
  room: Room
}
