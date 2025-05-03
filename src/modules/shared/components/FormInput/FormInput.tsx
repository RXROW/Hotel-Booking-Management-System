import { TextField, Typography, InputAdornment } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  rules?: object;
  iconeye?: React.ReactNode;
  showpassword?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const FormInput = ({
  name,
  label,
  type = "text",
  rules,
  iconeye,
  showpassword,
  placeholder,
  disabled = false,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputType =
    showpassword !== undefined ? (showpassword ? "text" : "password") : type;

  return (
    <div className="position-relative mt-4 form-field">
      <Typography
        variant="h6"
        fontWeight="bold"
        component={"label"}
        sx={{ color: "#152C5B", marginLeft: "5px" }}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        type={inputType}
        {...register(name, rules)}
        id={name}
        disabled={disabled}
        variant="outlined"
        InputProps={{
          endAdornment:
            type === "password" && iconeye ? (
              <InputAdornment position="end">{iconeye}</InputAdornment>
            ) : null,
        }}
        sx={{
          my: 1,
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E5E5E5",
              border: "none",
            },
            "&:hover fieldset": {
              borderColor: "#3252DF",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3252DF",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          "& .MuiOutlinedInput-input": {
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          borderRadius: 2,
        }}
      />
      {errors[name] && (
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ color: "red", my: "5px" }}
        >
          {errors[name]?.message as string}
        </Typography>
      )}
    </div>
  );
};
