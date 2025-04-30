import { Box, Container, Grid, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Stay
              <Box component="span" sx={{ color: "text.primary" }}>
                cation.
              </Box>
            </Typography>
            <Typography variant="body2" color="#B0B0B0" mt={2}>
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>

          {/* For Beginners */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="subtitle1"
              color="#152C5B"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              For Beginners
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" underline="hover" color="#B0B0B0">
                New Account
              </Link>
              <Link href="#" underline="hover" color="#B0B0B0">
                Start Booking a Room
              </Link>
              <Link href="#" underline="hover" color="#B0B0B0">
                Use Payments
              </Link>
            </Box>
          </Grid>

          {/* Explore Us */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="subtitle1"
              color="#152C5B"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Explore Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" underline="hover" color="#B0B0B0">
                Our Careers
              </Link>
              <Link href="#" underline="hover" color="#B0B0B0">
                Privacy
              </Link>
              <Link href="#" underline="hover" color="#B0B0B0">
                Terms & Conditions
              </Link>
            </Box>
          </Grid>

          {/* Connect Us */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography
              variant="subtitle1"
              color="#152C5B"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Connect Us
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" color="#B0B0B0">
                support@staycation.id
              </Typography>
              <Typography variant="body2" color="#B0B0B0">
                021 - 2208 - 1996
              </Typography>
              <Typography variant="body2" color="#B0B0B0">
                Staycation, Kemang, Jakarta
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" mt={5}>
          <Typography variant="body2" color="#B0B0B0">
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
