import {
  Box,
  Container,
  Link,
  Typography,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { getValidationRules } from "../../../../services/vaildation/validations";
import { USERS_URL } from "../../../../services/apis/apisUrls";
import axios from "axios";
import useObjectUrl from "../../../../hooks/useObjectUrl";
import { useRef, useState } from "react";
import FormButton from "../../../shared/components/ButtonForm/ButtonForm";
import { publicInstance } from "../../../../services/apis/apisConfig";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import usePasswordToggle from "../../../../hooks/PasswordToggle";
import CustomSnackbar from "../../../shared/components/Snackbar/Snackbar";
import useSnackbar from "../../../../hooks/useSnackbar";
import TitleAuth from "../../../shared/components/TitleAuth/TitleAuth";
import ReusableForm from "../../../shared/components/Resuableform/ReusableForm";
import { useTranslation } from "react-i18next";

interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export type User = {
  userName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList | null;
};

export default function Register() {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string>("");
  const methods = useForm<User>({
    defaultValues: {
      profileImage: new DataTransfer().files,
      userName: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    formState: { errors },
    watch,
    setValue,
  } = methods;
  const { snackbarState, showSnackbar, hideSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationRules = getValidationRules(watch);
  const selectedImg = watch("profileImage");
  const { showPasswords, getPasswordAdornment } = usePasswordToggle();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setValue("profileImage", event.target.files);
      } else {
        showSnackbar("Please select a valid image file", "error");
        event.target.value = "";
      }
    }
  };

  const onSubmit = async (data: User) => {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      if (key === "profileImage" && data[key]) {
        formData.append(key, data[key]?.[0]);
      } else {
        formData.append(key, data[key as keyof User] as string);
      }
    }
    formData.append("role", "user");
    try {
      const response = await publicInstance.post<RegisterResponse>(
        USERS_URL.REGISTER,
        formData
      );
      if (response.status === 201) {
        showSnackbar(
          response?.data?.message || "User created successfully",
          "success"
        );
        navigate("/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showSnackbar(
          error.response?.data?.message ||
            "Failed to Register. Please try again.",
          "error"
        );
      } else {
        console.error(error);
        showSnackbar("An unexpected error occurred", "error");
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <TitleAuth title={t("Authentication.title.signUp")} />
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            sx={{
              paddingTop: "1.625rem",
            }}
          >
            <FormInput
              label={t("Authentication.form.UserNameLabel")}
              name="userName"
              type="text"
              rules={validationRules.userName}
              placeholder={t("Authentication.form.UserNamePlaceholder")}
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                gap: "1rem",
                mb: 2,
              }}
            >
              <FormInput
                label={t("Authentication.form.PhoneNumberLabel")}
                name="phoneNumber"
                type="tel"
                rules={validationRules.phoneNumber}
                placeholder={t("Authentication.form.PhoneNumberPlaceholder")}
              />
              <FormInput
                label={t("Authentication.form.CountryLabel")}
                name="country"
                type="text"
                rules={validationRules.country}
                placeholder={t("Authentication.form.CountryPlaceholder")}
              />
            </Box>
            <FormInput
              label={t("Authentication.form.emailLabel")}
              name="email"
              type="email"
              rules={validationRules.email}
              placeholder={t("Authentication.form.emailPlaceholder")}
            />
            <FormInput
              label={t("Authentication.form.passwordLabel")}
              name="password"
              type={showPasswords.password}
              rules={validationRules.password}
              placeholder={t("Authentication.form.passwordPlaceholder")}
              iconeye={getPasswordAdornment("password")}
            />
            <FormInput
              label={t("Authentication.form.Confirm PasswordLabel")}
              name="confirmPassword"
              type={showPasswords.confirmPassword}
              rules={validationRules.confirmPassword}
              placeholder={t("Authentication.form.ConfirmpasswordPlaceholder")}
              iconeye={getPasswordAdornment("confirmPassword")}
            />
            <Box sx={{ mb: 2 }}>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
                ref={inputRef}
              />
              <Button
                variant="outlined"
                onClick={handleButtonClick}
                fullWidth
                sx={{
                  p: 2,
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {imagePreview ? (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Profile preview"
                    sx={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  `${t("Authentication.form.imagePlaceholder")}`
                )}
              </Button>
              {errors?.profileImage && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.profileImage.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ mt: "10px" }}>
              <FormButton isSubmitting={methods.formState.isSubmitting}>
                {t("Authentication.button.signup")}
              </FormButton>
            </Box>
          </Box>
        </ReusableForm>
      </FormProvider>
      <CustomSnackbar
        open={snackbarState.open}
        message={snackbarState.message}
        severity={snackbarState.severity}
        onClose={hideSnackbar}
      />
    </>
  );
}
