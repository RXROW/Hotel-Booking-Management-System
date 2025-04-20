import { Box, Typography } from "@mui/material";

function Commonheader() {
  return (
    <Box component="div" sx={{ display: "flex", py: 2 }}>
      <Typography variant="h3" fontWeight="bold" sx={{ color: "#3252DF" }}>
        Stay
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{ color: "#152C5B" }}>
        cation.
      </Typography>
    </Box>
  );
}
export default Commonheader;
