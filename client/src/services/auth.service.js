import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

//const baseUrl = "http://localhost:3000/api/user";
const baseUrl = "https://notepad-b.onrender.com/api/user";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    const checkSession = async () => {
      const accessToken = cookies.accessToken;
      if (accessToken) {
        try {
          let res = await axios.post(baseUrl + '/user-session', { token: accessToken });
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 500)
    };

    checkSession();
  }, []);

  return { isAuthenticated, isLoading, user };
};

const useAuthLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(['token']);
  
  const login = async (captcha, username, password) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/login', { captcha, username, password });
      if (!data) {
        return;
      }
      setIsLoading(false);
      setCookie('accessToken', data.accessToken);
      return { code: 200, message: "Success" }
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
      return { code: error?.response.status, message: error?.response.data.message };
    }
    setIsLoading(false);
  };

  return { login, isLoading };
};

const useAuthRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);
  
  const register = async (captcha, email, username, password) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/register', { captcha, email, username, password });
      if (!data) {
        return;
      }
      setIsSuccess(true)
      return { code: 200, message: "Success" }
    } catch (error) {
      return { code: error?.response.status, message: error?.response.data.message };
      console.log('error:', error);
    }
    setIsLoading(false);
  };

  return { register, isLoading, success };
};

const useAuthLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setIsSuccess] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  
  const logout = async (token) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(baseUrl + '/logout', { token });
      if (!data) {
        return;
      }
      removeCookie('accessToken');
      setIsSuccess(true)
    } catch (error) {
      console.log('error:', error);
    }
    setIsLoading(false);
  };
  
  //Remove the token on client side
  const clientLogout = () => {
    removeCookie('accessToken');
    setIsSuccess(true);
  };

  return { logout, clientLogout, isLoading, success };
};

export { useAuth, useAuthLogin, useAuthRegister, useAuthLogout };