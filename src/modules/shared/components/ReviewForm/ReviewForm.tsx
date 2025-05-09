// @ts-nocheck
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Rating,
  TextField,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { publicInstance } from '../../../../services/apis/apisConfig.js'
import { ROOM_URL_USER } from '../../../../services/apis/apisUrls.js'

const StyledButton = styled(Button)(() => ({
  height: '50px',
  fontSize: '18px',
  display: 'flex',
  backgroundColor: '#3252DF',
  width: '210px',
  marginTop: '1.7rem',
  '&.Mui-disabled': {
    background: '#949fcf',
    color: '#c0c0c0',
  },
}))
const ReviewForm = ({ roomId }: { roomId: string }) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
   
  } = useForm<any>({
    defaultValues: {
      roomId: roomId,
      rating: 1,
      review: '',
    },
    mode: 'onChange',
  })
  const onSubmit = async (data: Review) => {
    try {
      const Editdata = { ...data, roomId: roomId }
      const response = await publicInstance.post(
        ROOM_URL_USER.RATE_ROOM,
        Editdata,
      )

      console.log(response)
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: '500', fontSize: '20px' }}
        >
          Rate
        </Typography>
        <Controller
          name="rating"
          control={control}
          rules={{
            required: 'Please select a rating',
            min: { value: 1, message: 'Rating must be at least 1 star' },
          }}
          render={({ field, fieldState }) => (
            <FormControl>
              <Rating
                {...field}
                disabled={isSubmitting}
                precision={0.5}
                value={field.value}
                onChange={( newValue) => field.onChange(newValue)}
              />
              {fieldState?.error && (
                <FormHelperText
                  sx={{ color: '#EB5148', fontWeight: 600, fontSize: 16 }}
                >
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: '500',
            fontSize: '20px',
            marginBlockStart: '1.15rem',
          }}
        >
          Message
        </Typography>
        <Controller
          name="review"
          control={control}
          render={({ field, fieldState }) => (
            <FormControl>
              <TextField
                type="text"
                multiline
                rows={3}
                sx={{
                  borderRadius: '12px',
                  marginTop: '0.8rem',
                  width: '32.25rem',
                  height: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E5E5',
                      height: '150px',
                      border: '0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3252DF',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3252DF',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  },
                }}
                {...field}
              />
              {fieldState?.error && (
                <FormHelperText
                  sx={{ color: '#EB5148', fontWeight: 600, fontSize: 16 }}
                >
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
        <StyledButton
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{
            textTransform: 'none',
            alignSelf: {
              sm: 'flex-end',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: 'white' }} size={'1rem'} />
          ) : (
            'Rate'
          )}
        </StyledButton>
      </Box>
    </Box>
  )
}

export default ReviewForm
