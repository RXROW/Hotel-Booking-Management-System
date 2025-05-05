import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './modules/shared/components/NotFound/NotFound'
import Login from './modules/authentication/components/Login/Login'
import Register from './modules/authentication/components/Register/Register'
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword'
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword'
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import Explore from './modules/Explore/Explore'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import RoomList from './modules/Rooms/RoomsList/RoomList'
import RoomsData from './modules/Rooms/RoomsData/RoomsData'
import FacilitiesList from './modules/Facilities/FacilitiesList'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import Advertisements from './modules/Advertisements/Advertisements'
import AuthContextProvider from './context/AuthContext'
import UsersList from './modules/Users/UsersList'
import BookingList from './modules/Booking/BookingList'
import UserLayout from './modules/shared/components/UserLayout/UserLayout'
import HomePage from './modules/Home/HomePage/HomePage'
import { ToastContainer } from 'react-toastify'
import Favorites from './modules/Favorites/Favorites'
import DetailsPage from './modules/DetailsPage/DetailsPage'
import Payment from './modules/Payment/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentDone from './modules/PaymentDone/PaymentDone'


const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');


function App() {
  const routes = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: '/auth/login', element: <Login /> },
        { path: '/auth/register', element: <Register /> },
        { path: '/auth/forget-password', element: <ForgetPassword /> },
        { path: '/auth/reset-password', element: <ResetPassword /> },
        { path: '/auth/change-password', element: <ChangePassword /> },
      ],
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
        { index: true, element: <Dashboard /> },
        { path: 'rooms', element: <RoomList /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'facilities', element: <FacilitiesList /> },
        { path: 'advertisements', element: <Advertisements /> },
        { path: 'rooms/rooms-Data', element: <RoomsData /> },
        { path: 'rooms/:roomid', element: <RoomsData /> },
        { path: 'users', element: <UsersList /> },
        { path: 'booking', element: <BookingList /> },
      ],
    },
    {
      path: '/',
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'explore-all-rooms', element: <Explore /> },
        { path: 'details-page/:roomId', element: <DetailsPage /> },
        { path: '/favorites', element: <Favorites /> },
        {path: 'payment', element: <Elements stripe={stripePromise} ><Payment/></Elements> },
        {path: 'payment-done', element: <PaymentDone/>}
      ],
    },
  ])
  return (
    <AuthContextProvider>
      <ToastContainer />
      <RouterProvider router={routes} />
    </AuthContextProvider>
  )
}

export default App
