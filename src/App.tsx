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
<<<<<<< HEAD

import Dashboard from './modules/Dashboard/Dashboard'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import AuthContextProvider from './context/AuthContext'
import RoomsList from './modules/Rooms/RoomsList/RoomsList'
import RoomsData from './modules/Rooms/RoomsData/RoomsData'
=======
import AuthContextProvider from './context/AuthContext'
import Dashboard from './modules/Dashboard/Dashboard'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import FacilitiesList from './modules/Facilities/FacilitiesList'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import Advertisements from './modules/Advertisements/Advertisements'
>>>>>>> main


function App() {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
<<<<<<< HEAD
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
       

      ]
    },{
=======
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'change-password', element: <ChangePassword /> },
      ],
    },
    {
>>>>>>> main
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
<<<<<<< HEAD
        {index: true, element: <Dashboard/>},
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'rooms', element: <RoomsList/>},
        {path: 'rooms/rooms-Data', element: <RoomsData/>},
        {path: 'rooms/:roomid', element: <RoomsData/>},
      ]
    }
=======
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'facilities', element: <FacilitiesList /> },
        { path: 'advertisements', element: <Advertisements /> },
      ],
    },
>>>>>>> main
  ])

  return (
    <AuthContextProvider>
      <RouterProvider router={routes} />
    </AuthContextProvider>
  )
}

export default App
