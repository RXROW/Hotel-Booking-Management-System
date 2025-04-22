/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { privateInstance} from "../services/apis/apisConfig";
import { USERS_URL } from "../services/apis/apisUrls";


export const AuthContext = createContext<any>(null);


export default function AuthContextProvider(props: any) {

    const [loginData, setLoginData] = useState<any>(null);
    const [userName, setUserName] = useState<any>(null);
    const [profileImage, setProfileImage] = useState<any>(null);
    const saveLoginData = () => {
        const encodedToken: any = localStorage.getItem("token");
        const decodedToken: any = jwtDecode(encodedToken);


        if (loginData) {
            getCurrentUser();
        }
        setLoginData(decodedToken);
    };

    const getCurrentUser = () => {
        privateInstance
            .get(USERS_URL.GET_USER_PROFILE(loginData?._id))
            .then((response) => {
                console.log(loginData)
                console.log("LOG IN INFO :", response?.data?.data?.user);
                setUserName(response?.data?.data?.user?.userName);
                setProfileImage(response?.data?.data.user.profileImage);

            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            saveLoginData();
        }
    }, [loginData?.role]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setLoginData(null);
    };

    return (
        <AuthContext.Provider
            value={{ loginData, saveLoginData, logout, userName, profileImage }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
  }