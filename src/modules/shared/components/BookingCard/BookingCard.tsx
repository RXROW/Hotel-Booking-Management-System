import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { red } from "@mui/material/colors";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext.js";
import { privateInstance } from "../../../../services/apis/apisConfig.js";
import { BOOKING_URL_USER } from "../../../../services/apis/apisUrls.js";

const CustomizedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  color: "rgb(176, 176, 176)",
  width: "100%",
  padding: "2rem",
  borderRadius: "8px",
  border: "2px solid rgb(226, 229, 235)",
  textAlign: "start",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function BookingCard({
  roomId,
  totalPrice,
  discount,
  capacity,
}: {
  roomId: string;
  totalPrice: number;
  discount: number;
  capacity: number;
}) {
  let navigate = useNavigate();
  const { loginData } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClick = async () => {
    try {
      if (!dateRange.startDate || !dateRange.endDate) {
        setError("Please pick a start and end date.");
        return;
      }
      setIsSubmitting(true);
      if (loginData?.role === "user") {
        const response = await privateInstance.post(
          BOOKING_URL_USER.createBooking,
          {
            room: roomId,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            totalPrice,
          }
        );
        console.log(response);
        if (response.status === 201) {
          navigate(`/booking/${roomId}/user-info`, {
            state: { bookingId: response?.data?.data?.booking._id },
          });
        }
      } else {
        handleOpen();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CustomizedBox>
        <Typography>Start Booking</Typography>
        <Typography variant="h4" component="p">
          <Box component="span" sx={{ color: "#1ABC9C" }}>
            ${totalPrice}
          </Box>{" "}
          per night
        </Typography>
        <Typography sx={{ marginBlockEnd: "7.875rem", color: "#FF1612" }}>
          Discount {discount}% off
        </Typography>
        <Typography sx={{ marginBlockEnd: "0.5rem", color: "rgb(21, 44, 91)" }}>
          Pick a Date
        </Typography>
        {/* <DatePicker /> */}
        <Typography
          sx={{
            marginBlockStart: "1rem",
            marginInline: "auto",
            letterSpacing: "1px",
          }}
        >
          You will pay
          <Box sx={{ fontWeight: "bold", color: "#152C5B" }} component="span">
            ${0} USD
            {/* ${totalPrice * numBookingDays || 0} */}
          </Box>
          per
          <Box sx={{ fontWeight: "bold", color: "#152C5B" }} component="span">
            {capacity} Person
          </Box>
        </Typography>
        <Button
          onClick={handleButtonClick}
          sx={{
            marginBlock: "1rem",
            marginInline: "auto",
            backgroundColor: "#3252DF",
            width: { xs: "95%", md: "70%" },
            height: "3rem",
            borderRadius: "0.25rem",
            textTransform: "none",
            color: "#fff",
            fontSize: "17px",
            "&.Mui-disabled": {
              background: "#949fcf",
              color: "#c0c0c0",
            },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: "white" }} size={"1rem"} />
          ) : (
            " Continue Book"
          )}
        </Button>
      </CustomizedBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Continue Booking
            </Typography>
            <Button
              sx={{ ":hover": { backgroundColor: "unset" } }}
              onClick={handleClose}
            >
              <HighlightOffIcon sx={{ color: red[600] }} />
            </Button>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You need to log in to continue with your booking. Please log in or
            sign up for prooceed.
            <Typography></Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Login?
              </Link>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#3252DF" }}
              >
                Sign Up?
              </Link>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
