import {
  Box,
  Checkbox,
  Chip,
  colors,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TapAndPlayOutlined } from "@mui/icons-material";
import { privateInstance } from "../../../services/apis/apisConfig";
import { FACILITIES_URL, IMAGE_URL, ROOMS_URL } from "../../../services/apis/apisUrls";
import { ImagePreview } from "../../../interfaces/Roomsinterface";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, facilty: string[], theme: Theme) {
  return {
    fontWeight: facilty.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// end sec select

interface facility {
  _id: string;
  userName: string;
  name: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function RoomsData() {
  const params = useParams();
  const roomid=params.roomid;
  console.log(roomid)
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const MAX_IMAGES = 2;
  const [Allfacility, setAllFacility] = React.useState<facility[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormRoom>();


  const onSubmit: SubmitHandler<IFormRoom> = async (data) => {
    let formata = new FormData();
    formata.append("roomNumber", data.roomNumber);
    formata.append("capacity", data.capacity.toString());
    formata.append("discount", data.discount.toString());
    //    for (let i = 0; i < data.facilities.length; i++) {
    //   formata.append("facilities[]", data.facilities[i]);
    // }
     if (data.facilities && Array.isArray(data.facilities)) {
    data.facilities.forEach((facility) => {
     formata.append("facilities[]", facility);
    });
  }
  //    selectedFiles.forEach((file) => {
  //   formata.append("imgs", file);
  // });
 
 images.forEach((image) => {
      if (image.file) {
      formata.append("imgs", image.file);
    }
  });
    formata.append("price", data.price.toString());
    try {
    console.log(data)
    if(roomid){
       const responce = await privateInstance.put(ROOMS_URL.UPDATE_ROOM(roomid),formata);
       console.log(responce)
    } else{
       const responce = await privateInstance.post(ROOMS_URL.CREATE_ROOM,formata);
    }
     
      console.log("success")
    } catch (error: any) {
      console.log(error.message)
    }
  };  
    const getTaskById = async (): Promise<void> => {
    try {
      if (!roomid) return
      const res = await privateInstance.get(
       ROOMS_URL.GET_ROOM(roomid)
      )
      console.log(res)
      const response = res?.data?.data?.room
      console.log(response)
      setValue("roomNumber", response.roomNumber);
        setValue("price", response.price);
        setValue("capacity", response.capacity);
        setValue("discount", response.discount);
        setValue("facilities", response.facilities);
        // setSelectedFacilities(response.facilities)
        console.log(response)
// if (response.facilities && Array.isArray(response.facilities)) {
//       setSelectedFacilities(response.facilities);
//       setValue("facilities", response.facilities);
//     }
        if (response.facilities && Array.isArray(response.facilities)) {
      const facilityIds = response.facilities.map((facility: any) => facility._id);
      setSelectedFacilities(facilityIds);
      setValue("facilities", facilityIds);
    }
    // Handle images
    if (response.images && Array.isArray(response.images)) {
      const imagesPreviews = response.images.map((img: string) => ({
        url: img, // Keep the full image URL/path
        name: img.split('/').pop() || '',
        file: null,
        isExisting: true
      }));
      setImages(imagesPreviews);
      setValue("imgs", response.images);
    }
      console.log(images)
//        if (response.images
//  && response.images
// .length > 0) {
//       const imagesPreviews = response.images
// .map((img: string) => ({
//         url: `${IMAGE_URL}/${img}`, // Add your base URL
//         name: img.split('/').pop() || '',
//         file: null,
//         isExisting: true // Flag to identify existing images
//       }));
//       setImages(imagesPreviews);
//       setValue("imgs", response.images); // Set the form value for imgs
//     }
    } catch (error) {
      console.error(error || 'Failed to get data')
    }
  }

  useEffect(() => {
    if (roomid) {
      getTaskById()
    }
  }, [roomid,setValue])

  const getFacility = async () => {
      const res = await privateInstance.get(FACILITIES_URL.GET_FACILITIES);
      setAllFacility(res.data.data.facilities);
    };
  useEffect(()=>{
  getFacility();
  },[])
   

  // const handleChange = (event: SelectChangeEvent<typeof facilty>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setfacilty(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  //   console.log(facilty);
  // };
const handleChange = (event: SelectChangeEvent<typeof selectedFacilities>) => {
  const {
    target: { value },
  } = event;
  
  // Handle both string and array values
  const newValue = typeof value === 'string' ? value.split(',') : value;
  
  // Update both states
  setSelectedFacilities(newValue);
  setValue("facilities", newValue);
};
//   useEffect(() => {
//     if (!isNewRoom) {
//       const id = params.roomId;
//       const getRoomDetails = async () => {
//         const res = await axiosInstance.get(ADMINROOMS.getRoomDetails(`${id}`));
//         const response = res?.data.data.room;
//         setValue("roomNumber", response.roomNumber);
//         setValue("price", response.price);
//         setValue("capacity", response.capacity);
//         setValue("discount", response.discount);
//         setValue("facilities", response.facilities);
//         setValue("imgs", response.imgs);
//       };
//       getRoomDetails();
//     }
//   }, [isNewRoom, params.roomId, setValue]);

  interface IFormRoom {
    _id: number;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    imgs: string[];
    facilities: [];
  }
// Update your state


// Update your handleFileChange function
// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = Array.from(event.target.files || []);
//   const newImages = files.map((file) => ({
//     url: URL.createObjectURL(file),
//     name: file.name,
//     file: file
//   }));
  
//   setImages((prevImages) => [...prevImages, ...newImages]);
//   setSelectedFiles((prevFiles): any => [...prevFiles, ...files]);
// };
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(event.target.files || []);
  const newImages: ImagePreview[] = files.map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name,
    file: file,
    isExisting: false // Mark as new image
  }));
  
  setImages((prevImages) => [...prevImages, ...newImages]);
  // No need to maintain separate selectedFiles state
  // setSelectedFiles is removed as we're tracking files in the images array
};
// Add delete handler
const handleDeleteImage = (index: number) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
};

//   const handleChange = (event: SelectChangeEvent<typeof facilty>) => {
//     const {
//       target: { value },
//     } = event;
//     setfacilty(
//       // On autofill we get a stringified value.
//       typeof value === "string" ? value.split(",") : value
//     );
//     console.log(facilty);
//   };
console.log(selectedFacilities)
console.log(images)
  return (
    <>
      <Grid container spacing={2} mt={10}>
        <Grid   size={{ md: 8, sm: 12 }} offset={{ md: 2, sm: 0 }}>
        <Typography sx={{ fontWeight: "bold" , mb: 3}} variant="h5">
         "Edit Room Data"
        </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
          <InputLabel htmlFor="room-number" sx={{ color: 'var(--gray-color)' }}>
            Room Number
          </InputLabel>
          <TextField
            id="room-number"
            fullWidth
            variant="outlined"
            type="text"
            sx={{ marginBottom: "1rem", color: 'var(--primary-color)' }}
            {...register("roomNumber", { required: "Room number is required" })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber ? errors.roomNumber.message : ""}
          />
       <Grid container spacing={4}>
  {/* Discount Field */}
  <Grid item size={{ xs:6 , sm: 6 }} >
    <Box>
      <InputLabel htmlFor="Discount" sx={{ color: 'var(--gray-color)', marginBottom: 1 }}>
        Discount
      </InputLabel>
      <TextField
      fullWidth
        id="Discount"
        variant="outlined"
        type="number"
        sx={{
          color: 'var(--primary-color)',
        }}
        {...register("discount", {
          required: "Discount is required",
        })}
        error={!!errors.discount}
        helperText={errors.discount ? errors.discount.message : ""}
      />
    </Box>
  </Grid>
  {/* Facility Field */}
  <Grid item size={{ xs: 6, sm: 6 }} >
    <InputLabel htmlFor="demo-multiple-name" sx={{ color: 'var(--gray-color)' }}>
            Room Number
          </InputLabel>
        <FormControl
         sx={{
                  marginBottom: "1rem ",
                  border:"0",
                  // backgroundColor:"#ddd",
                  // color:"var(--gray-color)",
                  borderRadius:"10px",
                  width: { md: "100", sm: "100%" },
                }}
              >
  <InputLabel id="facilities-label">Facilities</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  fullWidth
                   value={selectedFacilities}
                  {...register("facilities", {
                    required: "facilities is required",
                  })}
                  error={!!errors.facilities}
                  onChange={handleChange}
                  input={<OutlinedInput label="facility" />}
                  MenuProps={MenuProps}
                >
                  {Allfacility.map((fac) => (
                    <MenuItem
                      key={fac._id}
                      value={fac._id}
                    >
                      {fac.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> 
  </Grid>
</Grid>
          <Box sx={{display: 'flex' ,alignItems:"center" ,gap:"20px" ,textAlign: 'left'}}>
            <div>
          <InputLabel htmlFor="price" sx={{ color: 'var(--gray-color)', marginRight: "1rem" }}>
            Price
          </InputLabel>
         <TextField
              fullWidth
              id="price"
              variant="outlined"
              type="text"
              {...register("price", {
                  required: "price is required",
                })}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""} // Display error message
              />
              </div>
          <div>
          <InputLabel htmlFor="Capacity" sx={{ color: '', marginRight: "1rem" }}>
          Capacity
          </InputLabel>
            <TextField
              fullWidth
              id="Capacity"
              variant="outlined"
              type="number"
              {...register("capacity", {
                required: "capacity is required",
              })}
              error={!!errors.capacity}
              helperText={errors.capacity ? errors.capacity.message : ""} // Display error message
              />
              </div>
          </Box>
         <Box>
  <Button
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUploadIcon />}
    disabled={images.length >= MAX_IMAGES}
    sx={{
      fontWeight: '900',
      color: 'var(--primary-color)',
      width: "100%",
      backgroundColor: "var(--light-blue)",
      border: "1px dashed var(--primary-color)",
      lineHeight: "10vh",
      boxShadow: "none",
      opacity: images.length >= MAX_IMAGES ? 0.7 : 1,
    }}
  >
    {images.length >= MAX_IMAGES 
      ? "Maximum images reached" 
      : `Upload Images (${images.length}/${MAX_IMAGES})`}
    <VisuallyHiddenInput
      type="file"
      multiple
      accept="image/*"
      onChange={handleFileChange}
      disabled={images.length >= MAX_IMAGES}
    />
  </Button>

<Box 
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mt: 2
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
        gap: 1
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100
        }}
      >
        <img
          src={image.url}
          alt={`uploaded-${image.name}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "4px"
          }}
        />
        <IconButton
          onClick={() => handleDeleteImage(index)}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            backgroundColor: 'white',
            '&:hover': { backgroundColor: '#f5f5f5' }
          }}
        >
          <DeleteIcon fontSize="small" color="error" />
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
          color: 'text.secondary'
        }}
      >
        {image.name}
      </Typography>
    </Box>
  ))}
  {Array.from({ length: MAX_IMAGES - images.length }).map((_, index) => (
    <Box
      key={`empty-${index}`}
      sx={{
        width: 100,
        height: 100,
        border: '2px dashed #ccc',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography color="textSecondary">
        {index + images.length + 1}
      </Typography>
    </Box>
  ))}
</Box>
</Box>

            <Button
              variant="outlined"
              sx={{ mt: "1rem", mr: "1rem", padding: "0.5rem 2rem" }}
            >
              <Link
                to="/dashboard/rooms-list"
                style={{ color: "var(--primary-color)", textDecoration: "none" }}
              >
                cancel
              </Link>
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: "1rem",
                mr: "1rem",
                padding: "0.5rem 3rem",
              }}
            >
             save 
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}