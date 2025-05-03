
import { Box, Snackbar, Alert} from "@mui/material";
import Grid from "@mui/material/Grid";

import TitleAuth from "../../../shared/components/TitleAuth/TitleAuth";
import ReusableForm from "../../../shared/components/Resuableform/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { LoginData } from "../../../../interfaces/authInterfaces";
import {
  emailValidation,
  passwordValidation,
} from "../../../../services/vaildation/validation";
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";
import usePasswordToggle from "../../../../hooks/PasswordToggle";

import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { USERS_URL } from "../../../../services/apis/apisUrls";
import { publicInstance } from "../../../../services/apis/apisConfig";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { showPasswords, getPasswordAdornment } = usePasswordToggle();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await publicInstance.post(USERS_URL.LOGIN, data);
      localStorage.setItem('token', response?.data?.data?.token.split(' ')[1]);
      console.log(response?.data?.data?.token.split(' ')[1])
      saveLoginData();
      const token = response?.data?.data?.token
      const isUser = response?.data?.data?.user?.role
      setSnackbarMessage("Login successful");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate(isUser === 'user' ? '/' : '/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setSnackbarMessage(error.response?.data?.message || 'Cannot Log in');
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
      console.log(error);
    }
  };

  return (

    <Grid container spacing={2} sx={{ height: "100%", px: 1 }}>
      <Grid item size={{ xs: 6, md: 6 }}>


        <Box component="div" sx={{ p: 3 }}>
          <TitleAuth title="Sign In" />
          <FormProvider {...methods}>
            <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
              <FormInput
                label="Email Address"
                name="email"
                rules={emailValidation}
                placeholder="Enter your User Email"
                type="email"
              />

              <FormInput
                label="Password"
                name="password"
                type="password"
                showpassword={showPasswords.password}
                rules={passwordValidation}
                placeholder="Enter your password"
                iconeye={getPasswordAdornment("password")}
              />

              <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Link
                to={"forget-password"}
                style={{ textDecoration: "none", color: "#000" }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <ButtonForm isSubmitting={methods.formState.isSubmitting}>
                Login
              </ButtonForm>
            </ReusableForm>
          </FormProvider>
        </Box>
      </Grid>


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
  );
};

export default Login;

