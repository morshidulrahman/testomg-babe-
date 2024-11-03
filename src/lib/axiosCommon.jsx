import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
export const axiosCommon = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Custom hook for using axios
const useAxiosCommon = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    //  request interceptor
    axiosCommon.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access_token");
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // response
    axiosCommon.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        toast({
          description: "Unauthorized access",
          variant: "error",
        });

        if (error.status == 401 || error.status == 403) {
          signOut({ redirectUrl: "/" });
        }
        return Promise.reject(error);
      }
    );
  }, [user, isLoaded]);
  return axiosCommon;
};

export default useAxiosCommon;
