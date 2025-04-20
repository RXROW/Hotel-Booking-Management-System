
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
// import authImage from "../../../../assets/imges/auth.jpg";
import TitleAuth from "../../../shared/components/TitleAuth/TitleAuth";
import Commonheader from "../../../shared/components/commonheader/Commonheader";
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
import { Link } from "react-router-dom";
const Login = () => {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (data: LoginData) => {
    console.log(data);
  };
  const { showPasswords, getPasswordAdornment } = usePasswordToggle();
  return (
    <Grid container spacing={2} sx={{ height: "100vh", px: 1 }}>
      <Grid item size={{ xs: 6, md: 6 }}>
        {/* <Commonheader /> */}
        <Box component="div" sx={{ p: 3 }}>
          <TitleAuth title="Sign In" />
          <FormProvider {...methods}>
            <ReusableForm onSubmit={methods.handleSubmit(handleSubmit)}>
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

<Box display="flex" justifyContent="flex-end">
  <Typography
    component={Link}
    to="/forget-password"
    sx={{ textDecoration: 'none', color: 'primary.main' }}
  >
    Forget Password?
  </Typography>
</Box>

              
              <ButtonForm isSubmitting={methods.formState.isSubmitting}>
                Login
              </ButtonForm>
            </ReusableForm>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

