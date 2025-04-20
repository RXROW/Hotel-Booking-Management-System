import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
// import authImage from "../../../../assets/imges/auth.jpg";
import TitleAuth from "../../../shared/components/TitleAuth/TitleAuth";
import Commonheader from "../../../shared/components/commonheader/Commonheader";
import ReusableForm from "../../../shared/components/Resuableform/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { LoginData } from "../../../../interfaces/authInterfaces";
import { passwordValidation } from "../../../../services/vaildation/validation";
import ButtonForm from "../../../shared/components/ButtonForm/ButtonForm";
import usePasswordToggle from "../../../../hooks/PasswordToggle";
import { useEffect } from "react";
const ChangePassword = () => {
  const methods = useForm<ChangeData>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const { showPasswords, getPasswordAdornment } = usePasswordToggle();
  const { trigger, watch } = methods;
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  const handleSubmit = async (data: LoginData) => {
    console.log(data);
  };
  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmNewPassword");
    }
  }, [confirmNewPassword, trigger, newPassword]);

  return (
    <Grid container spacing={2} sx={{ height: "100vh", px: 1 }}>
      <Grid item size={{ xs: 6, md: 6 }}>
        {/* <Commonheader /> */}
        <Box component="div" sx={{ p: 3 }}>
          <TitleAuth title="Change Password" />
          <FormProvider {...methods}>
            <ReusableForm onSubmit={methods.handleSubmit(handleSubmit)}>
              <FormInput
                label="old Password"
                name="oldPassword"
                type="password"
                showpassword={showPasswords.currentPassword}
                rules={passwordValidation}
                placeholder="Enter your Current  password"
                iconeye={getPasswordAdornment("currentPassword")}
              />
              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                showpassword={showPasswords.password}
                rules={passwordValidation}
                placeholder="Enter your New password"
                iconeye={getPasswordAdornment("password")}
              />
              <FormInput
                label=" Confirm New Password"
                name=" confirmNewPassword"
                type="password"
                showpassword={showPasswords.confirmPassword}
                rules={passwordValidation}
                placeholder="Confirm New  password"
                iconeye={getPasswordAdornment("confirmPassword")}
              />
              <ButtonForm isSubmitting={methods.formState.isSubmitting}>
                Change Password
              </ButtonForm>
            </ReusableForm>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
