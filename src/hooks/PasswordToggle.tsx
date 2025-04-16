import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface PasswordState {
  password: boolean;
  confirmPassword?: boolean;
  currentPassword?: boolean;
}
interface PasswordToggleReturn {
  showPasswords: PasswordState;
  getPasswordAdornment: (field: keyof PasswordState) => React.ReactNode;
}

const usePasswordToggle = (): PasswordToggleReturn => {
  const [showPasswords, setShowPasswords] = useState<PasswordState>({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });

  const togglePassword = (field: keyof PasswordState) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getPasswordAdornment = (field: keyof PasswordState) => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => togglePassword(field)}
        edge="end"
        sx={{
          "&:hover, &:active, &.Mui-focused": {
            backgroundColor: "transparent",
          },
        }}
      >
        {showPasswords[field] ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return {
    showPasswords,
    getPasswordAdornment,
  };
};

export default usePasswordToggle;
