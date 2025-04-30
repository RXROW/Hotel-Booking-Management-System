import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './modules/shared/components/NotFound/NotFound'
import Login from './modules/authentication/components/Login/Login'
import Register from './modules/authentication/components/Register/Register'
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword'
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword'
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'

// import '@fontsource/poppins/400.css';

import Dashboard from './modules/Dashboard/Dashboard'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import RoomsList from './modules/Rooms/RoomsList/RoomsList'
import RoomsData from './modules/Rooms/RoomsData/RoomsData'
import FacilitiesList from './modules/Facilities/FacilitiesList'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import Advertisements from './modules/Advertisements/Advertisements'
import AuthContextProvider from './context/AuthContext'


function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ]
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {index: true, element: <Dashboard/>},
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'rooms', element: <RoomsList/>},
        {path: 'rooms/rooms-Data', element: <RoomsData/>},
        {path: 'rooms/:roomid', element: <RoomsData/>},
        { path: 'facilities', element: <FacilitiesList /> },
        { path: 'advertisements', element: <Advertisements /> },
      ]
    }
  ])
        
  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  )
}

export default App
