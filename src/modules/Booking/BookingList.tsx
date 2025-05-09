// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { privateInstance } from '../../services/apis/apisConfig';
import { BOOKING_URL } from '../../services/apis/apisUrls';
import { Booking, getBookingsResponse } from '../../interfaces/BookingInterfaces';
import SharedTable from '../shared/components/SharedTable/SharedTable';
import TablePaginationActions from '../shared/components/TablePaginationActions/TablePaginationActions';
import TableHeader from '../shared/components/TableHeader/TableHeader';
import ViewModal from '../shared/components/ViewModal/ViewModal';
import VisibilityIcon from '@mui/icons-material/Visibility';

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const BookingList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);

  const getBookings = async ({ size, page }: { size: number; page: number }) => {
    setLoading(true);
    try {
      const response = await privateInstance.get<getBookingsResponse>(
        BOOKING_URL.GET_BOOKING,
        {
          params: { size, page: page + 1 },
        }
        );
        console.log(response);
      setBookings(response.data.data.booking || []);
      setCount(response.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    getBookings({ size, page: newPage });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
    getBookings({ size: newSize === -1 ? count : newSize, page: 0 });
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenViewModal(true);
  };

  useEffect(() => {
    getBookings({ size, page });
  }, [size, page]);

    const columns = [
        { id: 'room.roomNumber', label: 'Room Number', render: (row: Booking) => row.room.roomNumber },
        { id: 'user.userName', label: 'User Name', render: (row: Booking) => row.user.userName },
        { id: 'totalPrice', label: 'Total Price' },
        { id: 'startDate', label: 'Start Date', render: (row: Booking) => formatDate(row.startDate) },
        { id: 'endDate', label: 'End Date', render: (row: Booking) => formatDate(row.endDate) },
        { id: 'status', label: 'Status' },
        {
          id: 'actions',
          label: '',
          render: (row: Booking) => (
            <Button
              onClick={() => handleViewBooking(row)}
              variant="outlined"
              size="small"
              startIcon={<VisibilityIcon />}
              style={{ textTransform: 'none', border: 'none' }}
            >
              View
            </Button>
          ),
        },
      ];
      

  return (
    <Box>
      <TableHeader HeaderText="Booking" hideButton />
      <SharedTable
        columns={columns}
        rows={bookings}
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
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="Booking Details"
        data={{
          Room: selectedBooking?.room.roomNumber || 'N/A',
          User: selectedBooking?.user.userName || 'N/A',
          TotalPrice: selectedBooking?.totalPrice || 'N/A',
          StartDate: formatDate(selectedBooking?.startDate || ''),
          EndDate: formatDate(selectedBooking?.endDate || ''),
          Status: selectedBooking?.status || 'N/A',
        }}
      />
    </Box>
  );
};

export default BookingList;
