import { TextField, Typography, InputAdornment, useTheme } from '@mui/material'
import { useFormContext } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  type?: string
  rules?: object
  iconeye?: React.ReactNode
  showpassword?: boolean
  placeholder?: string
  disabled?: boolean
}

export const FormInput = ({
  name,
  label,
  type = 'text',
  rules,
  iconeye,
  showpassword,
  placeholder,
  disabled = false,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const theme = useTheme()
  const inputType =
    showpassword !== undefined ? (showpassword ? 'text' : 'password') : type

  return (
    <div className="position-relative mt-4 form-field">
      <Typography
        variant="h6"
        fontWeight="bold"
        component={'label'}
        sx={{
          color: theme.palette.mode === 'light' ? '#152C5B' : '#1976d2',
          marginLeft: '5px',
        }}
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
            type === 'password' && iconeye ? (
              <InputAdornment position="end">{iconeye}</InputAdornment>
            ) : null,
        }}
        sx={{
          my: 1,
          backgroundColor:
            theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
          boxShadow:
            theme.palette.mode === 'light'
              ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
              : '0px 2px 4px rgba(255, 255, 255, 0.05)',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E5E5E5',
              border: 'none',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '& .MuiOutlinedInput-input': {
              '&::placeholder': {
                color:
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            backgroundColor:
              theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
          borderRadius: 2,
        }}
      />
      {errors[name] && (
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ color: 'red', my: '5px' }}
        >
          {errors[name]?.message as string}
        </Typography>
      )}
    </div>
  )
}
