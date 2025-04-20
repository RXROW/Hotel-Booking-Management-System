import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import PasswordToggleIcon from "../../../shared/components/PasswordToggle/PasswordToggle";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatched, setIsMatched] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
    

  const navigate = useNavigate();

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setIsMatched(false);
      return;
    }

    setIsMatched(true);
    setIsLoading(true);  

    try {
      

      
      navigate("/");  

    } catch (error) {
      console.error(error);
      
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <Box sx={{  mx: "auto"}}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Sign up
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        If you already have an account register
        <br />
        You can{" "}
        <Box
          component="a"
          onClick={() => navigate("/")}
          sx={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
        >
          Login here!
        </Box>
      </Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
          User Name
        </Typography>
        <TextField
          fullWidth
          placeholder="Please type here ..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{ marginBottom: "20px" }}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
              Phone Number
            </Typography>
            <TextField
              fullWidth
              placeholder="Please type here ..."
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
              Country
            </Typography>
            <TextField
              fullWidth
              placeholder="Please type here ..."
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ marginBottom: "20px" }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
          Email Address
        </Typography>
        <TextField
          fullWidth
          placeholder="Please type here ..."
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
          Password
        </Typography>
        <TextField
          fullWidth
          placeholder="Please type here ..."
          type={showPassword ? "text" : "password"}
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                <PasswordToggleIcon
                  show={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "20px" }}
        />

        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#152C5B", marginLeft: "5px", marginBottom: "10px" }}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          placeholder="Please type here ..."
          type={showConfirm ? "text" : "password"}
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!isMatched}
          helperText={!isMatched ? "Passwords do not match" : ""}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end" sx={{ marginRight: "10px" }}>
                <PasswordToggleIcon
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "20px" }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: "16px",
            backgroundColor: "#3252DF",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#0955a1",
            },
          }}
          disabled={isLoading}  
        >
          {isLoading ? "Signing up..." : "Sign up"}  
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
