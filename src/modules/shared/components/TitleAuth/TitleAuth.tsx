import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TitleAuthProps {
  title: string;
}
const TitleAuth = ({ title }: TitleAuthProps) => {
  const compara = title === "Sign up" ? true : false;
  const navigate = useNavigate();
  const handleClick = () => {
    if (compara) navigate("/register");
    else navigate("/login");
  };
  return (
    <>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {compara
          ? "If you don’t have an account register"
          : title === "Change Password"
          ? "if you don’t change password "
          : " If you already have an account register"}
        <br />
        You can
        <Box
          component="a"
          onClick={handleClick}
          sx={{
            color: compara ? "red" : "#152C5B",
            fontWeight: "bold",
            cursor: "pointer",
            paddingLeft: "10px",
          }}
        >
          {compara ? "Register here !" : "Login here !"}
        </Box>
      </Typography>
    </>
  );
};
export default TitleAuth;
