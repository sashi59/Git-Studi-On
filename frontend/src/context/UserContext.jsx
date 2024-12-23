import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../App";
import { toast } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function userSignin(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/signin`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/account");
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      console.log("Error in userSignin", error);
      toast.error(error.response.data.message);
    }
  }

  async function userSignup(name, email, password, navigate) {
    setBtnLoading(true);
    try {
        const { data } = await axios.post(`${server}/api/user/signup`,{
            name,
            email,
            password,
        });
        toast.success(data.message);
        localStorage.setItem("accessToken", data.accessToken);
        setBtnLoading(false); // clear
        navigate("/verify");

    } catch (error) {
        console.log("Error in userSignup", error);
        setBtnLoading(false);
        toast.error(error.response.data.message);        
    }
  }

  async function verifyOtp (otp, navigate){
    setBtnLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
        const { data } = await axios.post(`${server}/api/user/verify`,{
            otp,
            accessToken
        });
        toast.success(data.message);
        navigate("/signin");
        localStorage.clear();
        setBtnLoading(false);
    } catch (error) {
        console.log("Error in verifyOtp", error)
        toast.error(error.response.data.message)
        setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log("Error in fetchUser", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);


return (
  <UserContext.Provider
    value={{
      user,
      setUser,
      isAuth,
      setIsAuth,
      btnLoading,
      setLoading,
      loading,
      userSignin,
      userSignup,
      verifyOtp,
      fetchUser,
    }}
  >
    {children}
  </UserContext.Provider>
);
}

export const UserData = () => useContext(UserContext);
