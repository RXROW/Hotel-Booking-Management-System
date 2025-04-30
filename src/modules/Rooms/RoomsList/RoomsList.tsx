/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import ImageRoom from "./assets/pexels-pixabay-262048.jpg";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useCallback } from "react";
import { Box, Typography, Avatar, Alert, styled } from "@mui/material";
import { privateInstance } from "../../../services/apis/apisConfig";
import { ROOMS_URL } from "../../../services/apis/apisUrls";
import ReusableModal from "../../shared/components/ResuableView/ReusableModal";
import { useNavigate } from "react-router-dom";
import SharedTable from "../../shared/components/SharedTable/SharedTable";
import TableHeader from "../../shared/components/TableHeader/TableHeader";
import DropdownMenu from "../../shared/components/DropdownMenu/DropdownMenu";
import { useAuthContext } from "../../../context/AuthContext";
import TablePaginationActions from "../../shared/components/TablePaginationActions/TablePaginationActions";
import DeleteConfirmation from "../../shared/components/DeleteConfirmation/DeleteConfirmation.js";
function RoomList() {
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedRoom, setselectedRoom] = useState<IRoom | null>(null);
  const [RoomDeleteId, setRoomDeleteId] = useState<string>("");
  const navigate = useNavigate();
  const [openViewModal, setOpenViewModal] = useState(false);
  const { Rooms, count, page, setSize, setPage, size, loading, fetchRooms } =
    useAuthContext();
  // console.log( page, size, loading);
  console.log(Rooms, page, size, loading);

  const handleDeletetRoom = async (): Promise<void> => {
    if (!RoomDeleteId) return;
    try {
      await privateInstance.delete(ROOMS_URL.DELETE_ROOM(RoomDeleteId));
      fetchRooms({ size, page });
      setOpenDeleteModal(false);
    } catch (error) {
      console.log(error || "Failed to delete rooom");
    }
  };
  const handleAction = (action: string, room) => {
    setselectedRoom(room);
    if (action === "view") {
      setOpenViewModal(true);
    } else if (action === "edit") {
      navigate(`/dashboard/rooms/${room?._id}`);
    } else if (action === "delete") {
      setRoomDeleteId(room?._id);
      setOpenDeleteModal(true);
    }
  };
  const handleCloseModal = (): void => {
    setOpenViewModal(false);
  };
  // const handleDeletetroom = (id: string): void => {
  //   // setModalShow(true);
  //   console.log(id);
  //   setRoomId(id);
  // };
  // const handleEditroom = (id: string): void => {
  //   navigate(`/dashboard/rooms/${id}`);
  // };
  // const GetCurrentRoom = (room: IRoom): void => {
  //   setcurrentroom(room);
  //   setIsModalOpen(true);
  // };
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchRooms({ size, page: newPage });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
    setPage(0);
    fetchRooms({ size: newSize === -1 ? count : newSize, page: 0 });
  };
  useEffect(() => {
    fetchRooms({ page, size });
  }, [page, size]);
  const columns = [
    {
      id: "Room Numbers",
      label: "Room Numbers",
      render: (row) => row?.roomNumber,
    },
    {
      id: "Images",
      label: "Images",
      render: (row) => (
        <>
          <img
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
            src={row?.images?.[0]}
          />
          ,
        </>
      ),
    },
    {
      id: "Price",
      label: "Price",
      render: (row) => row?.price,
    },
    {
      id: "Discount",
      label: "Discount",
      render: (row) => row?.discount,
    },
    {
      id: "Capacity",
      label: "Capacity",
      render: (row) => row?.capacity,
    },
    {
      id: "createdBy",
      label: "createdBy",
      render: (row) => row.createdBy?.userName ?? "N/A",
    },
    {
      id: "actions",
      label: "",
      render: (row) => (
        <DropdownMenu
          facility={row}
          onAction={(action: string) => handleAction(action, row)}
        />
      ),
    },
  ];
  return (
    <Box>
      <TableHeader HeaderText="Rooms Table Details" TextButton="Room" />
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
          setOpenDeleteModal(false);
          setRoomDeleteId(null);
        }}
        onConfirm={handleDeletetRoom}
        title="Delete Facility"
        message="Are you sure you want to delete this facility?"
      />
      <ReusableModal
        open={openViewModal}
        onClose={handleCloseModal}
        details={selectedRoom}
      />
    </Box>

    // <>
    //   <TableContainer component={Paper}>
    //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //       <TableHead sx={{ backgroundColor: "#E2E5EB", fontSize: 20 }}>
    //         <TableRow sx={{ fontSize: "90px" }}>
    //           <StyledTableCell>Room Numbers</StyledTableCell>
    //           <StyledTableCell align="center">Images</StyledTableCell>
    //           <StyledTableCell align="center">Price</StyledTableCell>
    //           <StyledTableCell align="center">Discount</StyledTableCell>
    //           <StyledTableCell align="center">Created At</StyledTableCell>
    //           <StyledTableCell align="center">updated At</StyledTableCell>
    //           <StyledTableCell align="center">Capacity</StyledTableCell>
    //           <StyledTableCell align="center">createdBy</StyledTableCell>
    //           <StyledTableCell align="center">Action</StyledTableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {data.map((room) => (
    //           <StyledTableRow
    //             key={room?.id}
    //             sx={{
    //               "&:last-child td, &:last-child th": { border: 0 },
    //             }}
    //           >
    //             <TableCell component="th" scope="row">
    //               {room.roomNumber}
    //             </TableCell>
    //             <TableCell align="center">
    //               {room.images.length > 0 ? (
    //                 <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
    //                   {room.images.map((image, index) => (
    //                     <Avatar
    //                       key={index}
    //                       src={image}
    //                       alt={`${index + 1}`}
    //                       sx={{ width: 50, height: 50, borderRadius: 1 }}
    //                       variant="square"
    //                     />
    //                   ))}
    //                 </Box>
    //               ) : (
    //                 <Alert severity="info" sx={{ padding: 1 }}>
    //                   no images here
    //                 </Alert>
    //               )}
    //               {/* {
    //                 <img
    //                   style={{ width: 70, height: 70, borderRadius: 8 }}
    //                   src={room?.images}
    //                   alt="images"
    //                 />
    //               } */}
    //             </TableCell>
    //             <TableCell align="center">{room?.price}</TableCell>
    //             <TableCell align="center">{room?.discount}</TableCell>
    //             <TableCell align="center">
    //               {new Date(room?.createdAt).toLocaleString()}
    //             </TableCell>
    //             <TableCell align="center">
    //               {new Date(room?.updatedAt).toLocaleString()}
    //             </TableCell>
    //             <TableCell align="center">{room?.capacity}</TableCell>
    //             <TableCell align="center">
    //               {room?.createdBy?.userName}
    //             </TableCell>
    //             <TableCell align="center">
    //               <span onClick={() => handleDeletetRoomApi(room?._id)}>
    //                 Delet
    //               </span>
    //               <span onClick={() => GetCurrentRoom(room)}>View</span>
    //               <span onClick={() => handleEditroom(room._id)}>Edit</span>
    //             </TableCell>
    //           </StyledTableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <ReusableModal
    //     open={isModalOpen}
    //     onClose={handleCloseModal}
    //     details={currentroom}
    //   />
    // </>
  );
}

export default RoomList;
