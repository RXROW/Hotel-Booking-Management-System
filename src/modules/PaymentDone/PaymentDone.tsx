import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { keyframes } from "@emotion/react";
import ConfirmationImg from '../../assets/imges/Successful purchase-pana.png'


const scaleUp = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export default function PaymentDone() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",  
        flexDirection: "column",
      }}
    >
      <Grid container justifyContent="center" alignItems="center" sx={{ animation: `${scaleUp} 1s ease-out` }}>
        <Grid item>
          <img
            src={ConfirmationImg} 
            alt="Payment Success"
            style={{
              width: "100%",
              maxWidth: "700px", 
              animation: `${scaleUp} 1s ease-out`,  
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 2, color: "#0277BD" }}>
        Payment Successful!
      </Typography>
      
    </Box>
  );
}
