import { Box, Typography, Link, IconButton, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import ReusableForm from "../../../shared/components/Resuableform/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { emailValidation, passwordValidation } from "../../../../services/vaildation/validation";
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { publicInstance } from "../../../../services/apis/apisConfig";
import { USERS_URL } from "../../../../services/apis/apisUrls";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetData } from "../../../../interfaces/authInterfaces";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const navigate = useNavigate();
  const location = useLocation();

  const methods = useForm<ResetData>({
    defaultValues: {
      email: location.state?.email || "",
      password: "",
      confirmPassword: "",
      seed: "",
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmitHandler = async (data: ResetData) => {
    try {
      const response = await publicInstance.post(USERS_URL.RESET_PASSWORD, data);
      setSnackbarMessage(response?.data?.message || "Password reset successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/login", { state: data.email });
    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(
        error?.response?.data?.message ||
        "Something went wrong please try again"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", width: "100%" }}>
      <Grid>
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" mb={2}>
            Reset Password
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" component="p">
              If you already have an account register
            </Typography>
            <Typography variant="body1" component="p">
              You can{" "}
              <Link href="/login" sx={{ color: "#f44336", textDecoration: "none", fontWeight: "medium" }}>
                Login here !
              </Link>
            </Typography>
          </Box>

          <FormProvider {...methods}>
            <ReusableForm onSubmit={methods.handleSubmit(onSubmitHandler)}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  Email
                </Typography>
                <FormInput
                  name="email"
                  rules={emailValidation}
                  placeholder="Please type here ..."
                  type="email"
                  label=""
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  OTP
                </Typography>
                <FormInput
                  name="seed"
                  rules={{ required: "OTP is required" }}
                  placeholder="Please type here ..."
                  type="text"
                  label=""
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  Password
                </Typography>
                <FormInput
                  name="password"
                  rules={passwordValidation}
                  placeholder="Please type here ..."
                  type={showPassword ? "text" : "password"}
                  label=""
                  iconeye={
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                  Confirm Password
                </Typography>
                <FormInput
                  name="confirmPassword"
                  rules={{
                    ...passwordValidation,
                    validate: (value: string) =>
                      value === methods.watch("password") || "Passwords do not match",
                  }}
                  placeholder="Please type here ..."
                  type={showConfirmPassword ? "text" : "password"}
                  label=""
                  iconeye={
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </Box>

              <ButtonForm isSubmitting={methods.formState.isSubmitting}>
                Reset
              </ButtonForm>
            </ReusableForm>
          </FormProvider>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;