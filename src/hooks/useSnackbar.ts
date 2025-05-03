// useSnackbar.ts
import { useState } from "react";
import { AlertColor } from "@mui/material";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

interface UseSnackbarReturn {
  snackbarState: SnackbarState;
  showSnackbar: (message: string, severity: AlertColor) => void;
  hideSnackbar: () => void;
}

const useSnackbar = (): UseSnackbarReturn => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: AlertColor = "success") => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const hideSnackbar = () => {
    setSnackbarState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    snackbarState,
    showSnackbar,
    hideSnackbar,
  };
};

export default useSnackbar;
