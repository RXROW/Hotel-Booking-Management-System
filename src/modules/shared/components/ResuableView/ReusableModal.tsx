/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { Grid } from "@mui/system";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// Styles for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};
const Overlay = {
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};
// interface ReusableModalProps {
//   open: boolean;
//   onClose: () => void;
//   title: string;
//   children: React.ReactNode; // Allows passing dynamic content
//   actions?: React.ReactNode; // Optional footer actions (e.g., buttons)
// }

const ReusableModal = ({ open, onClose, details }) => {
  // console.log(details);
  // const { capacity, discount, images, price, roomNumber, createdBy } = ?.details;
  // MuiBox - root
  return (
    <Modal
      sx={Overlay}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box sx={style}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Room Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Card>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={details?.images?.[0]}
          />
          <CardContent>
            <Typography variant="h6" color="textSecondary">
              RoomNumber: {details?.roomNumber}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              capacity: {details?.capacity} Person
            </Typography>
            <Typography variant="h6" color="textSecondary">
              discount: {details?.discount} %
            </Typography>
            <Typography variant="h6" color="textSecondary">
              price: {details?.price} $
            </Typography>
            <Typography variant="h6" color="textSecondary">
              createdBy: {details?.createdBy?.userName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
};
export default ReusableModal;
