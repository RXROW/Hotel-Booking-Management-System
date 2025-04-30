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
import styled from "styled-components";
import { privateInstance } from "./services/Apiconfig";
import { ROOMS_URL } from "./services/Api";
import { useCallback } from "react";
import { Box, Typography, Avatar, Alert } from "@mui/material";
import ReusableModal from "./ReusableModal";
function Rooms() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentroom, setcurrentroom] = useState("");
  const [RoomId, setRoomId] = useState(0);
  const fetchRooms = useCallback(async () => {
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

  const handleDeletetTaskApi = async () => {
    try {
      await privateInstance.delete(ROOMS_URL.DELETE_TASK(RoomId));
      fetchRooms();
    } catch (error) {
      console.log(error || "Failed to delete task");
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeletetroom = (id) => {
    // setModalShow(true);
    console.log(id);
    setRoomId(id);
  };

  const GetCurrentRoom = (currentroom) => {
    console.log(currentroom);
    setcurrentroom(currentroom);
    setIsModalOpen(true);
  };
  console.log(data);
  return (
    <div>
      <TableContainer component={Paper}>
        <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
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
                key={room.id}
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
                          alt={`صورة ${index + 1}`}
                          sx={{ width: 50, height: 50, borderRadius: 1 }}
                          variant="square"
                        />
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ padding: 1 }}>
                      لا توجد صور متاحة
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
                  <span onClick={() => handleDeletetroom(room?._id)}>
                    Delet
                  </span>
                  <span onClick={() => GetCurrentRoom(room)}>View</span>
                  {/* <span onClick={() => handleDeletetroom(data.id)}>Edit</span> */}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        details={currentroom}
      />
    </div>
  );
}

export default Rooms;
