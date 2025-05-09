// @ts-nocheck
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { Controller, useForm } from 'react-hook-form'
import { axiosInstance, COMMENTS_URLS } from '../../../../services/urls'
import { toast } from 'react-toastify'
import axios from 'axios'
import { getCommentValidationRules } from '../../../../services/Validations'
import { privateInstance } from '../../../../services/apis/apisConfig.js'
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
type Comment = {
  roomId: string
  comment: string
}
interface AddCommentResponse {
  success: boolean
  message: string
}
const CommentForm = ({ roomId }: { roomId: any }) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<Comment>({
    defaultValues: {
      roomId: roomId,
      comment: '',
    },
    mode: 'onChange',
  })
  const onSubmit = async (data: Comment) => {
    console.log(data)
    try {
      const response = await privateInstance.put(ROOM_URL_USER.CREATE_COMMENT, {
        ...data,
        roomId: roomId,
      })
      reset()
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
        color: '#152C5B',
      }}
    >
      <Typography variant="h6">Add Your Comment</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'column' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="comment"
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
                  sx={{ color: '#EB5148', fontWeight: 600, fontSize: 12 }}
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
              xs: 'flex-start',
              sm: 'flex-end',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress sx={{ color: 'white' }} size={'1rem'} />
          ) : (
            'Send'
          )}
        </StyledButton>
      </Box>
    </Box>
  )
}

export default CommentForm
