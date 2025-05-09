import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Room } from '../interfaces/Roomsinterface.js'
import { privateInstance } from '../services/apis/apisConfig'
import { USERS_URL } from '../services/apis/apisUrls.js'
import { ROOMS_URL } from '../services/apis/apisUrls'

interface AuthContextType {
  loginData: any | null;
  saveLoginData: () => void;
  logout: () => void;
  userName: string | null;
  profileImage: string | null;
  Rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  fetchRooms: (params: { size: number; page: number }) => Promise<void>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<any>(null)
  const [Rooms, setRooms] = useState<Room[]>([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  console.log(size, page)
  const saveLoginData = () => {
    const encodedToken: any = localStorage.getItem('token')
    const decodedToken: any = jwtDecode(encodedToken)
    if (loginData) {
      getCurrentUser()
    }
    setLoginData(decodedToken)
  }
  const getCurrentUser = () => {
    privateInstance
      .get(USERS_URL.GET_USER_PROFILE(loginData?._id))
      .then((response) => {
        setUserName(response?.data?.data?.user?.userName)
        setProfileImage(response?.data?.data.user.profileImage)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchRooms = async ({ size, page }: { size: number; page: number }) => {
    setLoading(true)
    try {
      const response = await privateInstance.get(ROOMS_URL.GET_ROOMS, {
        params: { size, page: page + 1 },
      })
      setRooms(response?.data?.data?.rooms)
      console.log(response)
      setCount(response?.data?.data?.totalCount || 0)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchRooms({ size, page })
  }, [size, page])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData()
    }
  }, [loginData?.role])
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setLoginData(null)
  }
  return (
    <AuthContext.Provider
      value={{
        loginData,
        saveLoginData,
        logout,
        userName,
        profileImage,
        Rooms,
        setRooms,
        fetchRooms,
        count,
        setCount,
        page,
        setPage,
        size,
        setSize,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}
