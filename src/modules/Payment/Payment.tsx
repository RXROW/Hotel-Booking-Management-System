import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Paper,
} from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CardImg from "../../assets/imges/Plain credit card-bro.png";
import ConfirmationImg from "../../assets/imges/Successful purchase-pana.png";
import FailureImg from "../../assets/imges/No data-bro.png";  
import { useLocation, useNavigate } from "react-router-dom";
import { privateInstance } from "../../services/apis/apisConfig";
import { BOOKING_URL_USER } from "../../services/apis/apisUrls";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const { bookingId } = location.state || {};  

  const payBooking = async (bookingId: string, token: string) => {
    try {
      const res = await privateInstance.post(
        BOOKING_URL_USER.PAY_BOOKING(bookingId),
        { token: token }
      );
      setPaymentSuccess(true); 
      toast.success(res?.data?.message);
      navigate("/payment-done");
    } catch (error) {
      setPaymentSuccess(false); 
      toast.error("Payment failed. Please try again.");
    }
  };

  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!elements || !stripe || !bookingId) return; 

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    if (!cardElement || !addressElement) {
      toast.error("Card or Address Element is missing.");
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error || !token) {
      toast.error("Failed to generate payment token");
      return;
    }

    payBooking(bookingId, token.id);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box component="section" sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h5" align="center" fontWeight="bold" color="primary" mb={3}>
        Stay<span style={{ color: "#000" }}>cation.</span>
      </Typography>

      <Paper elevation={1} sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={paymentSuccess === null ? CardImg : paymentSuccess ? ConfirmationImg : FailureImg}
                alt="Step Visual"
                style={{ width: "100%", maxWidth: "400px" }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <form onSubmit={paymentHandler}>
              <Box mb={3}>
                <AddressElement
                  options={{ mode: "billing" }}
                  
                />
              </Box>
              <Box mb={3}>
                <CardElement />
                <Divider sx={{ my: 3 }} />
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!stripe || !elements}
                  >
                    Submit Payment
                  </Button>
                </Box>
              </Box>

              {paymentSuccess !== null && (
                <Typography
                  variant="h6"
                  align="center"
                  color={paymentSuccess ? "success.main" : "error.main"}
                >
                  {paymentSuccess ? "Payment Successful!" : "Payment Failed. Please Try Again."}
                </Typography>
              )}
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}


