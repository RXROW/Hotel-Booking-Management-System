import { useState } from "react";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
  show?: boolean;
  onToggle?: () => void;
}

const PasswordToggleIcon = ({ show, onToggle }: Props) => {
  const [localShow, setLocalShow] = useState(false);

  const isControlled = show !== undefined && onToggle !== undefined;
  const visible = isControlled ? show : localShow;

  const handleClick = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setLocalShow((prev) => !prev);
    }
  };

  return (
    <IconButton onClick={handleClick} edge="end">
      {visible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
};

export default PasswordToggleIcon;
