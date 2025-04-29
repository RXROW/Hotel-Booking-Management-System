import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledBoxContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  [theme.breakpoints.between("xs", "md")]: {
    textAlign: "center",
  },
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const StyledImgBox = styled(Box)(({ theme }) => ({
  border: "2px solid #E5E5E5",
  borderRadius: "15px",
  position: "relative",
  zIndex: 0,
  [theme.breakpoints.down("sm")]: {
    border: "none",
    height: "auto",
  },
}));

export const StyledArrowBox = styled(Box)(() => ({
  display: "flex",
  gap: "60px",
  marginTop: "10px",
}));

export const StyledPersonText = styled(Typography)(() => ({
  color: "#B0B0B0",
  paddingTop: "8px",
  fontWeight: "400",
  fontSize: "18px",
}));
