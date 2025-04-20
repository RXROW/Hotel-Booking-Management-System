import { Button, CircularProgress } from "@mui/material";

interface ButtonProps {
  children: string;
  isSubmitting: boolean;
}

function ButtonForm({ children, isSubmitting }: ButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={isSubmitting}
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
        "& .MuiCircularProgress-root": {
          marginRight: 1,
          color: "red",
        },
      }}
    >
      {isSubmitting && <CircularProgress size={20} thickness={4} />}
      {children}
    </Button>
  );
}

export default ButtonForm;
