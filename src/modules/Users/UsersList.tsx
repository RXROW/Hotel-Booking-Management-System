// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import { privateInstance } from '../../services/apis/apisConfig';
import { USERS_URL } from '../../services/apis/apisUrls';
import { SharedUser, getUsersResponse } from '../../interfaces/UsersInterfaces';
import SharedTable from '../shared/components/SharedTable/SharedTable';
import TablePaginationActions from '../shared/components/TablePaginationActions/TablePaginationActions';
import TableHeader from '../shared/components/TableHeader/TableHeader';
import ViewModal from '../shared/components/ViewModal/ViewModal';
import VisibilityIcon from '@mui/icons-material/Visibility';


 
const UsersList = () => {
  const [users, setUsers] = useState<SharedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [selectedUser, setSelectedUser] = useState<SharedUser | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);


  const getUsers = async ({ size, page }: { size: number; page: number }) => {
    setLoading(true);
    try {
      const response = await privateInstance.get<getUsersResponse>(
        USERS_URL.GET_USERS,
        {
          params: { size, page: page + 1 },
        }
      );
      console.log(response)
      setUsers(response.data.data.users || []);
      setCount(response.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    getUsers({ size, page: newPage });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
    getUsers({ size: newSize === -1 ? count : newSize, page: 0 });
  };

  const handleViewUser = (user: SharedUser) => {
    setSelectedUser(user);
    setOpenViewModal(true);
  };


  useEffect(() => {
    getUsers({ size, page });
  }, [size, page]);


  const columns = [
    { id: 'userName', label: 'Username' },
    {
      id: 'profileImage',
      label: 'Image',
      render: (row: SharedUser) => (
        <img
          src={row.profileImage}
          alt="user"
          style={{ width: 60, height: 60, borderRadius: '10%' }}
        />
      ),
    },
    { id: 'email', label: 'Email' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'role', label: 'Role' },
    {
      id: 'verified',
      label: 'Status',
      render: (row: SharedUser) =>
        row.verified ? (
          <span style={{ color: 'green', fontWeight: 600 }}>Verified</span>
        ) : (
          <span style={{ color: 'red', fontWeight: 600 }}>Not Verified</span>
        ),
    },
    {
      id: 'actions',
      label: '',
      render: (row: SharedUser) => (
        <Button
          onClick={() => handleViewUser(row)}
          variant="outlined"
          size="small"
          startIcon={<VisibilityIcon />}
          style={{ textTransform: 'none', border: "none" }}
        >
          View
        </Button>
      ),
    }


  ];


  return (
    <Box>
      <TableHeader
        HeaderText="Users"
        hideButton
        onClick={() => { }}
      />


      <SharedTable
        columns={columns}
        rows={users}
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

      {/* <ViewModal
  open={openViewModal}
  onClose={() => setOpenViewModal(false)}
  title="User Details"
  data={{
    Username: selectedUser?.userName || 'N/A',
    Email: selectedUser?.email || 'N/A',
    Phone: selectedUser?.phoneNumber || 'N/A',
    Role: selectedUser?.role || 'N/A',
    Verified: selectedUser?.verified ? 'Yes' : 'No',
    Country: selectedUser?.country || 'N/A',
  }}
/> */}
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="User Details"
        data={{
          Image: selectedUser?.profileImage || '',
          Username: selectedUser?.userName || 'N/A',
          Email: selectedUser?.email || 'N/A',
          Phone: selectedUser?.phoneNumber?.toString() || 'N/A',
          Role: selectedUser?.role || 'N/A',
          Verified: selectedUser?.verified ? 'Yes' : 'No',
        }}
      />

    </Box>

  );
};

export default UsersList;
