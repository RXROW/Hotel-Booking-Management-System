import { Box, Container, Link, Typography, Snackbar, Alert, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import {
  getValidationRules,
} from "../../../../services/validations";
import { USERS_URL } from "../../../../services/apis/apisUrls";
import axios from "axios";
import useObjectUrl from "../../../../hooks/useObjectUrl";
import { useRef, useState } from "react";
import FormButton from "../../../shared/components/ButtonForm/ButtonForm";
import { publicInstance } from "../../../../services/apis/apisConfig";
import { FormInput } from "../../../shared/components/FormInput/FormInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

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
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

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
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue,
  } = methods;

  const navigate = useNavigate();
  const validationRules = getValidationRules(watch);
  const selectedImg = watch("profileImage");

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClickShowPassword = (field: "password" | "confirmPassword") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getPasswordAdornment = (field: "password" | "confirmPassword") => (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => handleClickShowPassword(field)}
        edge="end"
      >
        {showPasswords[field] ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setValue("profileImage", event.target.files);
      } else {
        showSnackbar("Please select a valid image file", "error");
        event.target.value = '';
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
        showSnackbar(response?.data?.message || "User created successfully", "success");
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
    <Container
      sx={{
        paddingTop: "2rem",
        
      }}
    >
      <Typography variant="h4">Sign up</Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "310px",
          paddingTop: "1rem",
          wordSpacing: "1px",
          lineHeight: "1.6",
        }}
      >
        If you already have an account register You can{" "}
        <Link
          component={RouterLink}
          to={"/login"}
          sx={{ color: "#EB5148", fontWeight: "600", textDecoration: "none" }}
        >
          Login here !
        </Link>
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              paddingTop: "1.625rem",
            }}
          >
            <FormInput
              label="User Name"
              name="userName"
              type="text"
              rules={validationRules.userName}
              placeholder="Please type here ..."
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
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                rules={validationRules.phoneNumber}
                placeholder="Please type here ..."
              />
              <FormInput
                label="Country"
                name="country"
                type="text"
                rules={validationRules.country}
                placeholder="Please type here ..."
              />
            </Box>

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              rules={validationRules.email}
              placeholder="Please type here ..."
            />

            <FormInput
              label="Password"
              name="password"
              type={showPasswords.password ? "text" : "password"}
              rules={validationRules.password}
              placeholder="Enter your password"
              iconeye={getPasswordAdornment("password")}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type={showPasswords.confirmPassword ? "text" : "password"}
              rules={validationRules.confirmPassword}
              placeholder="Confirm your password"
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
                  "Click to upload profile image"
                )}
              </Button>
              {errors?.profileImage && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.profileImage.message}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: "10px" }}>
              <FormButton isSubmitting={isSubmitting}>
                Sign up
              </FormButton>
            </Box>
          </Box>
        </form>
      </FormProvider>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

