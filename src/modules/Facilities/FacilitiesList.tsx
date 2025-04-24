import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
} from '@mui/material';
import { privateInstance } from '../../services/apis/apisConfig';
import { FACILITIES_URL } from '../../services/apis/apisUrls';
import { facility, getFacilitesResponse } from '../../interfaces/FacilitiesInterfaces';
import SharedTable from '../shared/components/SharedTable/SharedTable';
import TablePaginationActions from '../shared/components/TablePaginationActions/TablePaginationActions';
import DeleteConfirmation from '../shared/components/DeleteConfirmation/DeleteConfirmation';
import FacilityForm from './FacilitiesForm/FacilitesForm';
import ViewModal from '../shared/components/ViewModal/ViewModal';
import TableHeader from '../shared/components/TableHeader/TableHeader';
import DropdownMenu from '../shared/components/DropdownMenu/DropdownMenu';

const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const FacilitiesList = () => {
  const [facilities, setFacilities] = useState<facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [selectedFacility, setSelectedFacility] = useState<facility | null>(null);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [facilityName, setFacilityName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [facilityToDeleteId, setFacilityToDeleteId] = useState<string | null>(null);

  const [openViewModal, setOpenViewModal] = useState(false);

  const getFacilities = async ({ size, page }: { size: number; page: number }) => {
    setLoading(true);
    try {
      const response = await privateInstance.get<getFacilitesResponse>(
        FACILITIES_URL.GET_FACILITIES,
        {
          params: { size, page: page + 1 },
        }
      );
      setFacilities(response.data.data.facilities || []);
      setCount(response.data.data.totalCount || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    getFacilities({ size, page: newPage });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
    getFacilities({ size: newSize === -1 ? count : newSize, page: 0 });
  };

  useEffect(() => {
    getFacilities({ size, page });
  }, [size, page]);

  const handleViewClick = () => {
    if (!selectedFacility) return;
    setOpenViewModal(false);
    
      setOpenViewModal(true);
    
  };

  const handleOpenEditModal = () => {
    if (!selectedFacility) return;
    setIsEditing(true);
    setFacilityName(selectedFacility.name);
    setEditingId(selectedFacility._id);
    setFormModalOpen(true);
  };

  const handleSubmitFacility = async () => {
    try {
      if (isEditing && editingId) {
        await privateInstance.put(FACILITIES_URL.UPDATE_FACILITY(editingId), {
          name: facilityName,
        });
      } else {
        await privateInstance.post(FACILITIES_URL.CREATE_FACILITY, {
          name: facilityName,
        });
      }

      setFormModalOpen(false);
      setFacilityName('');
      setEditingId(null);
      getFacilities({ size, page });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFacility = async () => {
    if (!facilityToDeleteId) return;
    try {
      await privateInstance.delete(FACILITIES_URL.DELETE_FACILITY(facilityToDeleteId));
      setOpenDeleteModal(false);
      setFacilityToDeleteId(null);
      getFacilities({ size, page });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (action: string, facility: facility) => {
    setSelectedFacility(facility); 
    if (action === 'view') {
      setOpenViewModal(true);
    } else if (action === 'edit') {
      setFacilityName(facility.name);
      setEditingId(facility._id);
      setIsEditing(true);
      setFormModalOpen(true);
    } else if (action === 'delete') {
      setFacilityToDeleteId(facility._id);
      setOpenDeleteModal(true);
    }
  };
  

  const columns = [
    { id: 'name', label: 'Name' },
    {
      id: 'createdAt',
      label: 'Created At',
      render: (row: facility) => formatDate(row.createdAt),
    },
    {
      id: 'createdBy',
      label: 'Created By',
      render: (row: facility) => row.createdBy?.userName ?? 'N/A',
    },
    {
      id: 'updatedAt',
      label: 'Updated At',
      render: (row: facility) => formatDate(row.updatedAt),
    },
    {
      id: 'actions',
      label: '',
      render: (row: facility) => (
        <DropdownMenu
        facility={row}
          onAction={(action: string) => handleAction(action, row)}
        />
      ),
    },
  ];

  return (
    <Box>
      <TableHeader
        HeaderText='Facilities'
        TextButton='Facility'
        onClick={() => {
          setIsEditing(false);
          setFacilityName('');
          setFormModalOpen(true);
        }}
      />

      <SharedTable
        columns={columns}
        rows={facilities}
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
      <FacilityForm
        open={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setFacilityName('');
          setEditingId(null);
        }}
        onSubmit={handleSubmitFacility}
        facilityName={facilityName}
        setFacilityName={setFacilityName}
        isEditing={isEditing}
      />

      {/* DeleteConfirmation Modal */}
      <DeleteConfirmation
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setFacilityToDeleteId(null);
        }}
        onConfirm={handleDeleteFacility}
        title="Delete Facility"
        message="Are you sure you want to delete this facility?"
      />

      {/* View Modal */}
      <ViewModal
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        title="View Facility"
        data={{
          Name: selectedFacility?.name ?? 'No Name',
          CreatedBy: selectedFacility?.createdBy?.userName ?? 'Unknown',
        }}
      />
    </Box>
  );
};

export default FacilitiesList;
