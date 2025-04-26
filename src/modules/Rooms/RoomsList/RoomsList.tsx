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
function RoomList()  {
 const [data, setData] = useState<IRoom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentroom, setcurrentroom] = useState<IRoom | null>([]);
  const [RoomId, setRoomId] = useState<string>("");
  const navigate = useNavigate();
   const fetchRooms = useCallback(async (): Promise<void> => {
    try {
      const response = await privateInstance.get(ROOMS_URL.GET_ROOMS);
      setData(response.data.data.rooms);
      console.log(response.data.data.rooms);
    } catch (err) {
      setError(err.message);
    }
  }, []);
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#E2E5EB",
      color: "#1F263E",
      fontSize: 18,
      fontWeight: "600",
    },
    [`&.${tableCellClasses.body}`]: {
      border: 0,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F8F9FB",
    },
    "& td, & th": {
      border: 0,
      fontSize: 18,
    },
  }));

  const handleDeletetRoomApi = async (id: string): Promise<void> => {
    try {
      await privateInstance.delete(ROOMS_URL.DELETE_ROOM(id));
      fetchRooms();
    } catch (error) {
      console.log(error || "Failed to delete rooom");
    }
  };
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };
   const handleDeletetroom = (id: string): void => {
    // setModalShow(true);
    console.log(id);
    setRoomId(id);
  };
  console.log(RoomId);
  console.log(currentroom);
  const handleEditroom = (id: string): void => {
    navigate(`/dashboard/rooms/${id}`);
  };

   const GetCurrentRoom = (room: IRoom): void => {
    setcurrentroom(room);
    setIsModalOpen(true);
  };
  console.log(data);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#E2E5EB", fontSize: 20 }}>
            <TableRow sx={{ fontSize: "90px" }}>
              <StyledTableCell>Room Numbers</StyledTableCell>
              <StyledTableCell align="center">Images</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Created At</StyledTableCell>
              <StyledTableCell align="center">updated At</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>
              <StyledTableCell align="center">createdBy</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((room) => (
              <StyledTableRow
                key={room?.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {room.roomNumber}
                </TableCell>
                <TableCell align="center">
                  {room.images.length > 0 ? (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {room.images.map((image, index) => (
                        <Avatar
                          key={index}
                          src={image}
                          alt={`${index + 1}`}
                          sx={{ width: 50, height: 50, borderRadius: 1 }}
                          variant="square"
                        />
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ padding: 1 }}>
                     no images here
                    </Alert>
                  )}
                  {/* {
                    <img
                      style={{ width: 70, height: 70, borderRadius: 8 }}
                      src={room?.images}
                      alt="images"
                    />
                  } */}
                </TableCell>
                <TableCell align="center">{room?.price}</TableCell>
                <TableCell align="center">{room?.discount}</TableCell>
                <TableCell align="center">
                  {new Date(room?.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(room?.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">{room?.capacity}</TableCell>
                <TableCell align="center">
                  {room?.createdBy?.userName}
                </TableCell>
                <TableCell align="center">
                  <span onClick={() =>handleDeletetRoomApi(room?._id)}>
                    Delet
                  </span>
                  <span onClick={() => GetCurrentRoom(room)}>View</span>
                  <span onClick={() => handleEditroom(room._id)}>Edit</span>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        details={currentroom}
      /> 
    </>
  );
}

export default RoomList;
