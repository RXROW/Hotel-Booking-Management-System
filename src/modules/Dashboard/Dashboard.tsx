import { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Skeleton, 
  useTheme, 
  useMediaQuery,
  Paper, 
  LinearProgress
} from "@mui/material";
import { 
  MeetingRoom as RoomIcon,
  Spa as FacilityIcon,
  Campaign as AdsIcon,
  CheckCircleOutline as CompletedIcon,
  PendingActions as PendingIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon
} from "@mui/icons-material";
import { privateInstance } from "../../services/apis/apisConfig";
import { DASHBOARD_URL } from "../../services/apis/apisUrls";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'

interface BookingData {
  completed: number;
  pending: number;
}

interface UsersData {
  admin: number;
  user: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, isLoading }) => {
  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: "16px",
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        color: "white",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
        
        {isLoading ? (
          <Skeleton 
            variant="rectangular" 
            width="60%" 
            height={40} 
            animation="wave" 
            sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} 
          />
        ) : (
          <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
            {value.toLocaleString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const [rooms, setRooms] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [ads, setAds] = useState(0);
  const [booking, setBooking] = useState<BookingData>({
    completed: 0,
    pending: 0,
  });
  const [users, setUsers] = useState<UsersData>({ admin: 0, user: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const getDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await privateInstance.get(DASHBOARD_URL.CHART, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      const data = response?.data?.data;
      
      setRooms(data.rooms);
      setFacilities(data.facilities);
      setAds(data.ads);
      setBooking({
        completed: data.bookings.completed,
        pending: data.bookings.pending,
      });
      setUsers({
        admin: data.users.admin,
        user: data.users.user,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
    
    // Set up auto-refresh every 5 minutes
    const intervalId = setInterval(() => {
      getDashboardData();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Prepare chart data
  const bookingData = [
    { name: "Completed", value: booking.completed, color: "#4caf50" },
    { name: "Pending", value: booking.pending, color: "#ff9800" },
  ];
  
  const usersData = [
    { name: "Admins", value: users.admin, color: "#2196f3" },
    { name: "Users", value: users.user, color: "#9c27b0" },
  ];

  const COLORS = ["#4caf50", "#ff9800", "#2196f3", "#9c27b0"];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: "1600px", margin: "0 auto" }}>
      {error && (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            mb: 3, 
            bgcolor: "#ffebee", 
            color: "#c62828",
            borderRadius: "8px",
            border: "1px solid #ef9a9a"
          }}
        >
          <Typography>{error}</Typography>
        </Paper>
      )}
      
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: "bold" }}>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Rooms" 
            value={rooms} 
            icon={<RoomIcon fontSize="large" />} 
            color="#1e88e5" 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Facilities" 
            value={facilities} 
            icon={<FacilityIcon fontSize="large" />} 
            color="#4381a0" 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard 
            title="Advertisements" 
            value={ads} 
            icon={<AdsIcon fontSize="large" />} 
            color="#3A86FF" 
            isLoading={isLoading} 
          />
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: "16px", height: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
                Booking Status
              </Typography>
              
              {isLoading ? (
                <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Skeleton variant="circular" width={200} height={200} animation="wave" />
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <Skeleton variant="text" height={30} animation="wave" />
                    <Skeleton variant="text" height={30} animation="wave" />
                  </Box>
                </Box>
              ) : booking.completed === 0 && booking.pending === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    No booking data available
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {bookingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} bookings`, '']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <CompletedIcon sx={{ color: "#4caf50", mr: 1 }} />
                        <Typography variant="body1">
                          Completed Bookings: {booking.completed}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={booking.completed / (booking.completed + booking.pending) * 100 || 0} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: "#e8f5e9",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#4caf50" }
                        }} 
                      />
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <PendingIcon sx={{ color: "#ff9800", mr: 1 }} />
                        <Typography variant="body1">
                          Pending Bookings: {booking.pending}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={booking.pending / (booking.completed + booking.pending) * 100 || 0} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: "#fff3e0",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#ff9800" }
                        }} 
                      />
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ borderRadius: "16px", height: "100%" }}>
            <CardContent>
              <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
                User Distribution
              </Typography>
              
              {isLoading ? (
                <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Skeleton variant="circular" width={200} height={200} animation="wave" />
                  <Box sx={{ width: "100%", mt: 2 }}>
                    <Skeleton variant="text" height={30} animation="wave" />
                    <Skeleton variant="text" height={30} animation="wave" />
                  </Box>
                </Box>
              ) : users.admin === 0 && users.user === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    No user data available
                  </Typography>
                </Box>
              ) : (
                <>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={usersData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {usersData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} users`, '']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <AdminIcon sx={{ color: "#2196f3", mr: 1 }} />
                        <Typography variant="body1">
                          Admins: {users.admin}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={users.admin / (users.admin + users.user) * 100 || 0} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: "#e3f2fd",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#2196f3" }
                        }} 
                      />
                    </Box>
                    
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <UserIcon sx={{ color: "#9c27b0", mr: 1 }} />
                        <Typography variant="body1">
                          Regular Users: {users.user}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={users.user / (users.admin + users.user) * 100 || 0} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: "#f3e5f5",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#9c27b0" }
                        }} 
                      />
                    </Box>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}