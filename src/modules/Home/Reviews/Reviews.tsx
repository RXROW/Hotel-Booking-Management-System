// import Slider, { Settings } from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Box, Rating, Typography } from "@mui/material";
// import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
// import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
// import StarIcon from "@mui/icons-material/Star";
// import img1 from "../../../assets/imges/Reviews/picture (1).png";
// import img2 from "../../../assets/imges/Reviews/Happy family.jpg";
// import img3 from "../../../assets/imges/Reviews/Happy Family2.jpg";
// import { styled } from "@mui/system";
// import { useRef, useMemo } from "react";

// type Review = {
//   img: string;
//   title: string;
//   rate: JSX.Element;
//   comment: string;
//   person: string;
// };

// const Reviews = () => {
//   const reviewData: Review[] = useMemo(
//     () => [
//       {
//         img: img1,
//         title: "Best Service Ever",
//         rate: (
//           <Rating
//             name="text-feedback"
//             value={5}
//             readOnly
//             precision={0.5}
//             size="large"
//             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//           />
//         ),
//         comment: "The team was incredibly professional and made our stay unforgettable!",
//         person: "Sarah K.",
//       },
//       {
//         img: img2,
//         title: "Great Family Experience",
//         rate: (
//           <Rating
//             name="text-feedback"
//             value={4.5}
//             readOnly
//             precision={0.5}
//             size="large"
//             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//           />
//         ),
//         comment: "Perfect for a family vacation. Kids loved it, and so did we!",
//         person: "Ahmed R.",
//       },
//       {
//         img: img3,
//         title: "Clean and Cozy",
//         rate: (
//           <Rating
//             name="text-feedback"
//             value={4}
//             readOnly
//             precision={0.5}
//             size="large"
//             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//           />
//         ),
//         comment: "Everything was clean, organized, and felt like home. Highly recommended.",
//         person: "Emily J.",
//       },
//     ],
//     []
//   );

//   const sliderRef = useRef<Slider>(null);

//   const next = () => {
//     sliderRef.current?.slickNext();
//   };

//   const prev = () => {
//     sliderRef.current?.slickPrev();
//   };

//   const settings: Settings = {
//     dots: false,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         paddingBottom: "50px",
//       }}
//       id="reviews"
//     >
//       <Slider {...settings} ref={sliderRef}>
//         {reviewData.map((item, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex !important",
//               flexDirection: {
//                 xs: "column",
//                 md: "row",
//               },
//               gap: {
//                 xs: "0px",
//                 sm: "80px",
//               },
//               height: {
//                 xs: "auto",
//                 md: "780px",
//               },
//               alignItems: {
//                 xs: "center",
//               },
//               paddingInline: {
//                 xs: "10px",
//                 sm: "0px",
//               },
//             }}
//           >
//             {/* Left Side */}
//             <Box
//               sx={{
//                 display: "flex !important",
//                 flexDirection: "column !important",
//               }}
//             >
//               <StyledImgBox
//                 sx={{
//                   width: { xs: "240px", sm: "356px", lg: "450px" },
//                   height: {
//                     xs: "auto",
//                     sm: "560px",
//                     lg: "560px",
//                   },
//                   marginTop: { xs: "4rem", sm: "2.5rem" },
//                   marginInline: { xs: "auto", sm: "0rem" },
//                 }}
//               >
//                 <Box
//   component={"img"}
//   src={item.img}
//   sx={{
//     width: {
//       xs: "100%",
//       sm: "356px",
//       lg: "450px",
//     },
//     height: {
//       xs: "300px",
//       sm: "560px",
//       lg: "560px",
//     },
//     paddingX: {
//       xs: "10px"
//     },
//     objectFit: "cover",
//     borderRadius: "15px 15px 100px 15px",
//     position: {
//       xs: "static",
//       sm: "absolute",
//     },
//     top: {
//       sm: "40px",
//     },
//     left: {
//       sm: "40px",
//     },
//     zIndex: 10,
//   }}
// />

//               </StyledImgBox>
//             </Box>

//             {/* Right Side */}
//             <StyledBoxContent
//               sx={{
//                 paddingInline: {
//                   xs: "2rem",
//                   sm: "0rem",
//                 },
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{ fontWeight: "500", fontSize: "24px", color: "#152C5B" }}
//               >
//                 {item.title}
//               </Typography>

//               <Box>
//                 <Box
//                   sx={{
//                     textAlign: {
//                       xs: "center",
//                       md: "start",
//                     },
//                   }}
//                 >
//                   {item.rate}
//                 </Box>
//                 <Typography
//                   variant="body1"
//                   sx={{
//                     maxWidth: "595px",
//                     fontSize: {
//                       xs: "20px",
//                       sm: "32px",
//                     },
//                     color: "#152C5B",
//                     paddingTop: "8px",
//                   }}
//                 >
//                   {item.comment}
//                 </Typography>
//                 <StyledPersonText variant="body2">
//                   {item.person}
//                 </StyledPersonText>
//               </Box>
//               <StyledArrowBox>
//                 <ArrowCircleLeftOutlinedIcon
//                   onClick={prev}
//                   sx={{
//                     color: "#203FC7",
//                     display: "flex",
//                     zIndex: 10,
//                     cursor: "pointer",
//                     fontSize: "57px",
//                   }}
//                 />
//                 <ArrowCircleRightOutlinedIcon
//                   onClick={next}
//                   sx={{
//                     color: "#203FC7",
//                     display: "flex",
//                     zIndex: 10,
//                     cursor: "pointer",
//                     fontSize: "57px",
//                   }}
//                 />
//               </StyledArrowBox>
//             </StyledBoxContent>
//           </Box>
//         ))}
//       </Slider>
//     </Box>
//   );
// };

// export default Reviews;

// // ⭐ Styled Components

// const StyledBoxContent = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: "30px",
//   [theme.breakpoints.between("xs", "md")]: {
//     textAlign: "center",
//   },
//   [theme.breakpoints.down("md")]: {
//     alignItems: "center",
//   },
// }));

// const StyledImgBox = styled(Box)(({ theme }) => ({
//   border: "2px solid #E5E5E5",
//   borderRadius: "15px",
//   position: "relative",
//   zIndex: 0,
//   [theme.breakpoints.down("sm")]: {
//     border: "none",
//     height: "auto", // ✅ للموبايل فقط
//   },
// }));

// const StyledArrowBox = styled(Box)(() => ({
//   display: "flex",
//   gap: "60px",
//   marginTop: "10px",
// }));

// const StyledPersonText = styled(Typography)(() => ({
//   color: "#B0B0B0",
//   paddingTop: "8px",
//   fontWeight: "400",
//   fontSize: "18px",
// }));




/**//////////////////////////// */

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { useRef } from "react";
import ReviewCard from "./ReviewCard";
import { reviewData } from "./ReviewData";

const Reviews = () => {
  const sliderRef = useRef<Slider>(null);

  const next = () => sliderRef.current?.slickNext();
  const prev = () => sliderRef.current?.slickPrev();

  const settings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", paddingBottom: "50px" }} id="reviews">
      <Slider {...settings} ref={sliderRef}>
        {reviewData.map((item, index) => (
          <ReviewCard key={index} item={item} prev={prev} next={next} />
        ))}
      </Slider>
    </Box>
  );
};

export default Reviews;
