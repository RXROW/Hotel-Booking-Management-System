 /* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link   , useLocation } from "react-router-dom";
import {
  HomeTwoTone as HomeIcon,
  PeopleAltTwoTone as UsersIcon,
  DashboardTwoTone as RoomsIcon,
  CalendarMonthTwoTone as AdsIcon,
  BookOnlineTwoTone as BookingsIcon,
  PrecisionManufacturingTwoTone as FacilitiesIcon,
  LockOpenTwoTone as ChangePasswordIcon,
 
  DoubleArrow as ToggleIcon,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material"; 

interface SidebarProps {
  onToggle: () => void;
  collapsed: boolean;
}

interface MenuItemConfig {
  label: string;
  path: string;
  icon: any;
  onClick?: () => void;
}

const SidebarMenuItem = ({
    label,
    path,
    icon,
    onClick,
    isActive,
    collapsed,
}: {
    label: string;
    path: string;
    icon: any;
    onClick?: () => void;
    isActive: boolean;
    collapsed: boolean;
}) => (
    <MenuItem
        component={ <Link to={path} />}
        onClick={onClick}
        rootStyles={{
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
            "&:hover": {
                backgroundColor: "white",
                color: "#203fc7", 
                "& .menu-icon": {
                    color: "#203fc7",
                },
            },
        }}
    >
        <Box
            className="menu-icon"
            sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: collapsed ? "0.5rem" : "1rem",
                color: "white",
                transition: "all 0.3s",
                marginBottom: "1rem",
                paddingTop: "1rem",
            }}
        >
            {icon}
            {!collapsed && (
                <span style={{ marginLeft: "1rem", color: "inherit" }}>{label}</span>
            )}
        </Box>
    </MenuItem>
);


export default function SidebarComponent({ onToggle, collapsed }: SidebarProps) {
 
  const location = useLocation();

   

  const isActive = (path: string) => location.pathname.includes(path);

  const menuItems: MenuItemConfig[] = [
    { label: "Home", path: "/dashboard", icon: <HomeIcon /> },
    { label: "Users", path: "/users", icon: <UsersIcon /> },
    { label: "Rooms", path: "/rooms", icon: <RoomsIcon /> },
    { label: "Ads", path: "/advertisments", icon: <AdsIcon /> },
    { label: "Bookings", path: "/booking", icon: <BookingsIcon /> },
    { label: "Facilities", path: "facilities", icon: <FacilitiesIcon /> },
    { label: "Change Password", path: "/change-password", icon: <ChangePasswordIcon /> }, 
  ];

  return (
    <Sidebar
      rootStyles={{
              height: "100vh",
          overflow: "hidden",
      }}
    >
      <IconButton
        onClick={onToggle}
        sx={{
          transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all 0.3s",
          position: "absolute",
          right: collapsed ? "170px" : "5px",
          color: "white",
        }}
        aria-label="Toggle Sidebar"
      >
        <ToggleIcon />
      </IconButton>
      <Menu
        rootStyles={{
          paddingTop: "4rem",
          backgroundColor: "rgba(32, 63, 199, 1)",
          height: "100%",
        }}
      >
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.label}
            label={item.label}
            path={item.path}
            icon={item.icon}
            onClick={item.onClick}
            isActive={isActive(item.path)}
            collapsed={collapsed}
          />
        ))}
      </Menu>
    </Sidebar>
  );
}