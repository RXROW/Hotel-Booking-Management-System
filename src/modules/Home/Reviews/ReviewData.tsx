import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import img1 from "../../../assets/imges/Reviews/picture (1).png";
import img2 from "../../../assets/imges/Reviews/Happy family.jpg";
import img3 from "../../../assets/imges/Reviews/Happy Family2.jpg";

export const reviewData = [
  {
    img: img1,
    title: "Best Service Ever",
    rate: (
      <Rating
        name="text-feedback"
        value={5}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment: "The team was incredibly professional and made our stay unforgettable!",
    person: "Sarah K.",
  },
  {
    img: img2,
    title: "Great Family Experience",
    rate: (
      <Rating
        name="text-feedback"
        value={4.5}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment: "Perfect for a family vacation. Kids loved it, and so did we!",
    person: "Ahmed R.",
  },
  {
    img: img3,
    title: "Clean and Cozy",
    rate: (
      <Rating
        name="text-feedback"
        value={4}
        readOnly
        precision={0.5}
        size="large"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    ),
    comment: "Everything was clean, organized, and felt like home. Highly recommended.",
    person: "Emily J.",
  },
];
