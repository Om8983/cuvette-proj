import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  // the strategy for following function is stated in eraser.io cuvette project
  // will urge you to visit the understanding of this function on eraser.io
  function getCookie(name : string ) { 
    const cookies = `; ${document.cookie}`
    const tokens = cookies.split(`; ${name}=`)
    if(tokens.length === 2){
      const access = tokens[1].split(';')[0]
      return access
    }
    if(name === "refreshToken"){
      const refresh = tokens[0].split(`; ${name}=`)
      return refresh
    }
    return null 
  }
  useEffect(() => {
    (async () => {
      const accesstoken = getCookie("accessToken");
      if (!accesstoken) {
        const refreshToken = getCookie("refreshToken");
        if (!refreshToken) {
          alert("Please Re-Login");
          navigate("/login");
        } else {
          try {
            await axios.post(
              "http://localhost:3000/app/v1/refreshToken",
              {},
              { withCredentials: true }
            );
          } catch (error) {
            if (error instanceof AxiosError) {
              if (
                error.response?.status === 401 ||
                error.response?.status === 403
              ) {
                alert("Please Re-LogIn");
                navigate("/login");
                return;
              } else {
                console.error("unexpected error occured");
                return;
              }
            }
          }
        }
      }
    })();
    return () => {};
  }, [navigate]);

  return (
    <>
      <a href="/">Home</a>
      Dashboard
    </>
  );
};

// the issue with below code is, first of all there was unnecessary navigation of the dashboard page since user was already on the dashboard page.
// Secondly how you are splitting the accesstoken from the cookies. You should use a helper function that helps to extract the cookies by name
// if (!accessToken) {
//   alert("Please Login")
//   navigate('/login')
// } else {
//   navigate("/dashboard")
//   return;

// ------- token structure
// we did this becuase if accesstoken isn't the first part of the string then it would lead to errors cuz we are directly accessing the value of accesstoken by splitting its name directly
// now tokens would look something like this (see the end of the doc)
// ["", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTE0NjA2ZDI0Y2Y2YzQ0ZDY1ZGIwMSIsInVzZXJuYW1lIjoib20gd2FkaGkiLCJlbWFpbCI6Imxvc3Rib3liZWdpbmluZ0BnbWFpbC5jb20iLCJpYXQiOjE3MjkyNjE2MDh9.1HpeVgKmf4rzqUqloPu6npbsWg4AEgBJBJ684smhpDw; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTE0NjA2ZDI0Y2Y2YzQ0ZDY1ZGIwMSIsImlhdCI6MTcyOTI2MTYwOH0.2E6TuMjuwwXSvJDHu9qIuyI9kCYFPQ13aF7BX5JpXfc"]
// }
