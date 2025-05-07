import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  colors,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from '@mui/material/Button'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import FormHelperText from '@mui/material/FormHelperText'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { TapAndPlayOutlined } from '@mui/icons-material'
import { privateInstance } from '../../../services/apis/apisConfig'
import { FACILITIES_URL, ROOMS_URL } from '../../../services/apis/apisUrls'
import { ImagePreview } from '../../../interfaces/Roomsinterface'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

// end sec select

interface facility {
  _id: string
  userName: string
  name: string
}

interface IFormRoom {
  _id: number
  roomNumber: string
  price: number
  capacity: number
  discount: number
  imgs: string[]
  facilities: []
}

export default function RoomsData() {
  const params = useParams()
  const roomid = params.roomid
  const [images, setImages] = useState<ImagePreview[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const MAX_IMAGES = 2
  const [Allfacility, setAllFacility] = React.useState<facility[]>([])
  const navigate = useNavigate()
  const theme = useTheme()
  const commonTextFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
    backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
        : '0px 2px 4px rgba(255, 255, 255, 0.05)',
    borderRadius: 2,
    transition: 'all 0.3s linear',
    '&:hover': {
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 4px 8px rgba(0, 0, 0, 0.15)'
          : '0px 4px 8px rgba(255, 255, 255, 0.08)',
    },
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormRoom>()
  const convertImageUrlToFile = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const filename = url.split('/').pop() || `image-${Date.now()}.jpg`
      return new File([blob], filename, { type: blob.type || 'image/jpeg' })
    } catch (error) {
      console.error('Error converting image URL to File:', error)
      return null
    }
  }
  const onSubmit: SubmitHandler<IFormRoom> = async (data) => {
    const formata = new FormData()
    formata.append('roomNumber', data.roomNumber)
    formata.append('capacity', data.capacity.toString())
    formata.append('discount', data.discount.toString())
    if (selectedFacilities) {
      selectedFacilities.forEach((facilityId) =>
        formata.append('facilities[]', facilityId),
      )
    }
    data.imgs.forEach((file) => {
      formata.append('imgs', file)
    })
    formata.append('price', data.price.toString())
    try {
      if (roomid) {
        const responce = await privateInstance.put(
          ROOMS_URL.UPDATE_ROOM(roomid),
          formata,
        )
        navigate(-1)
      } else {
        const responce = await privateInstance.post(
          ROOMS_URL.CREATE_ROOM,
          formata,
        )
        navigate(-1)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  const getRoomById = async (): Promise<void> => {
    try {
      if (!roomid) return
      const res = await privateInstance.get(ROOMS_URL.GET_ROOM(roomid))
      console.log(res)
      const response = res?.data?.data?.room
      console.log(response)
      setValue('roomNumber', response.roomNumber)
      setValue('price', response.price)
      setValue('capacity', response.capacity)
      setValue('discount', response.discount)
      setValue('facilities', response.facilities)
      console.log(response.facilities)
      if (response.facilities) {
        const facilityIds = response.facilities.map((facility: any | string) =>
          typeof facility === 'string' ? facility : facility['_id'],
        )
        setSelectedFacilities(facilityIds)
        setValue('facilities', facilityIds)
      }
      if (response.images && response.images.length > 0) {
        const filePromises = response.images.map((url) =>
          convertImageUrlToFile(url),
        )
        const files = await Promise.all(filePromises)
        const validFiles = files.filter((file) => file !== null)
        setImages(validFiles)
        setValue('imgs', validFiles)
      }
      console.log(images)
    } catch (error) {
      console.error(error || 'Failed to get data')
    }
  }

  useEffect(() => {
    if (roomid) {
      getRoomById()
    }
  }, [roomid, setValue])

  const getFacility = async () => {
    const res = await privateInstance.get(FACILITIES_URL.GET_FACILITIES)
    setAllFacility(res.data.data.facilities)
  }
  useEffect(() => {
    getFacility()
  }, [])

  const handleChange = (
    event: SelectChangeEvent<typeof selectedFacilities>,
  ) => {
    const {
      target: { value },
    } = event
    console.log(value)
    const newValue = typeof value === 'string' ? value.split(',') : value
    setSelectedFacilities(newValue)
    setValue('facilities', newValue)
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const updatedFiles = [...images, ...newFiles]
      setImages(updatedFiles)
      setValue('imgs', updatedFiles)
    }
  }
  // Add delete handler
  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }
  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: 'bold', mb: 3 }} variant="h5">
          {roomid ? 'Edit Room Data' : 'Create Room Data'}
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel htmlFor="room-number">Room Number</InputLabel>
          <TextField
            sx={commonTextFieldStyles}
            id="room-number"
            fullWidth
            variant="outlined"
            type="text"
            {...register('roomNumber', {
              required: 'Room number is required',
            })}
          />
          <FormHelperText sx={{ color: 'red', fontSize: '0.8rem' }}>
            {errors.roomNumber ? errors.roomNumber.message : ''}
          </FormHelperText>
          <Stack flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Box sx={{ flex: '1' }}>
              <InputLabel htmlFor="Discount" sx={{ margin: '0.5rem 0 ' }}>
                Discount
              </InputLabel>
              <TextField
                sx={commonTextFieldStyles}
                fullWidth
                id="Discount"
                variant="outlined"
                type="number"
                {...register('discount', {
                  required: 'Discount is required',
                })}
              />
              <FormHelperText sx={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.discount ? errors.discount.message : ''}
              </FormHelperText>
            </Box>
            <Box sx={{ flex: '1' }}>
              <InputLabel
                htmlFor="demo-multiple-name"
                sx={{ margin: '0.5rem 0 ' }}
              >
                Facilities
              </InputLabel>
              <FormControl
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor:
                      theme.palette.mode === 'light' ? '#f5f5f5' : '#1e1e1e',
                    boxShadow:
                      theme.palette.mode === 'light'
                        ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
                        : '0px 2px 4px rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s linear',
                    '&:hover': {
                      boxShadow:
                        theme.palette.mode === 'light'
                          ? '0px 4px 8px rgba(0, 0, 0, 0.15)'
                          : '0px 4px 8px rgba(255, 255, 255, 0.08)',
                    },
                  },
                }}
              >
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  fullWidth
                  value={selectedFacilities}
                  {...register('facilities', {
                    required: 'facilities is required',
                  })}
                  error={!!errors.facilities}
                  onChange={handleChange}
                  input={<OutlinedInput label="facility" />}
                  MenuProps={MenuProps}
                >
                  {Allfacility.map((fac) => (
                    <MenuItem key={fac._id} value={fac._id}>
                      {fac.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText sx={{ color: 'red', fontSize: '0.8rem' }}>
                {selectedFacilities.length === 0
                  ? errors.facilities?.message
                  : ''}
              </FormHelperText>
            </Box>
          </Stack>
          <Stack flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
            <Box sx={{ flex: '1' }}>
              <InputLabel htmlFor="price" sx={{ margin: '0.5rem 0 ' }}>
                price
              </InputLabel>
              <TextField
                sx={commonTextFieldStyles}
                fullWidth
                id="price"
                variant="outlined"
                type="number"
                {...register('price', {
                  required: 'price is required',
                })}
              />
              <FormHelperText sx={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.price ? errors.price.message : ''}
              </FormHelperText>
            </Box>
            <Box sx={{ flex: '1' }}>
              <InputLabel htmlFor="Capacity" sx={{ margin: '0.5rem 0 ' }}>
                Capacity
              </InputLabel>
              <TextField
                sx={commonTextFieldStyles}
                fullWidth
                id="Capacity"
                variant="outlined"
                type="number"
                {...register('capacity', {
                  required: 'capacity is required',
                })}
              />
              <FormHelperText sx={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.capacity ? errors.capacity.message : ''}
              </FormHelperText>
            </Box>
          </Stack>
          <Box sx={{ mx: '20' }}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={images.length >= MAX_IMAGES}
              sx={{
                fontWeight: '900',
                color: '#fff',
                width: '100%',
                margin: ' 20px 0 ',
                backgroundColor: '#1976d2',
                lineHeight: '10vh',
                boxShadow: 'none',
                opacity: images.length >= MAX_IMAGES ? 0.7 : 1,
              }}
            >
              {images.length >= MAX_IMAGES
                ? 'Maximum images reached'
                : `Upload Images (${images.length}/${MAX_IMAGES})`}
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="image/*"
                {...register('imgs')}
                onChange={handleFileChange}
                disabled={images.length >= MAX_IMAGES}
              />
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mt: 2,
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 100,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <IconButton
                      onClick={() => handleDeleteImage(index)}
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        '&:hover': { backgroundColor: '#f5f5f5' },
                      }}
                    >
                      <CloseIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    {image.name}
                  </Typography>
                </Box>
              ))}
              {Array.from({ length: MAX_IMAGES - images.length }).map(
                (_, index) => (
                  <Box
                    key={`empty-${index}`}
                    sx={{
                      width: 100,
                      height: 100,
                      border: '2px dashed #ccc',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="textSecondary">
                      {index + images.length + 1}
                    </Typography>
                  </Box>
                ),
              )}
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: '1rem', mr: '1rem', padding: '0.5rem 2rem' }}
          >
            <Link
              to="/dashboard/rooms"
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
              }}
            >
              cancel
            </Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="contained"
            sx={{
              mt: '1rem',
              mr: '1rem',
              padding: '0.5rem 3rem',
            }}
          >
            {isSubmitting ? 'Loading....' : roomid ? 'Edit' : 'Create'}
          </Button>
        </Box>
      </Box>
    </>
  )
}
