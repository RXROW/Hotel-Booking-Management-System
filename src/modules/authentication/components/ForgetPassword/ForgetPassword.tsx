import { Box, Typography, Link, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import ReusableForm from "../../../shared/components/Resuableform/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { emailValidation } from "../../../../services/vaildation/validation";
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";
import { publicInstance } from "../../../../services/apis/apisConfig";
import { USERS_URL } from "../../../../services/apis/apisUrls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onSubmitHandler = async (data: any) => {
    await publicInstance
      .post(USERS_URL.FORGOT_PASSWORD, data)
      .then((response) => {
        console.log(response?.data?.message);
        setSnackbarMessage(response?.data?.message || "please check your email for OTP");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/reset-password", { state: data.email });
      })
      .catch((error) => {
        console.log(error);
        setSnackbarMessage(
          error?.response?.data?.message ||
          "something went wrong please try again"
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh", width: "100%" }}>
      <Grid >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" mb={1}>
            Forget password
          </Typography>

          <Box sx={{ mb: 4 }}>
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

              <ButtonForm
                isSubmitting={methods.formState.isSubmitting}
              >
                Send mail
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

export default ForgetPassword;