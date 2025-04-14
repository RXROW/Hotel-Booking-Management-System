import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './modules/shared/components/NotFound/NotFound'
import Login from './modules/authentication/components/Login/Login'
import Register from './modules/authentication/components/Register/Register'
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword'
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword'
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'

function App() {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "changepassword", element: <ChangePassword /> },
        
      ]
    }])

  return (
    <>
              <RouterProvider router={routes}></RouterProvider>

    </>
  )
}

export default App
