import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDailog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        window.location.reload();
      });
  };

  return (
    <div
      className="p-4 shadow-lg flex justify-between items-center px-5 bg-black relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(33,33,33,1) 0%, rgba(0,0,0,1) 100%)",
        animation: "animateBackground 6s infinite alternate",
      }}
    >
      {/* Animated Background */}
      <style>
        {`
          @keyframes animateBackground {
            0% {
              background-position: 0% 0%;
              background-color: #000;
            }
            100% {
              background-position: 100% 100%;
              background-color: #111;
            }
          }
        `}
      </style>

      {/* Logo */}
      <a className="size-12 flex flex-row items-center" href="/">
        <img className="m-2" src="/appLogo.png" alt="logo" />
        <h3 className="m-2 font-extrabold text-2xl text-gray-300">
          TripGPT.AI
        </h3>
      </a>

      {/* Navigation */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full border-gray-400 text-black hover:bg-gray-700"
              >
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full border-gray-400 text-black hover:bg-gray-700"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full border-2 border-gray-500"
                  alt="user"
                />
              </PopoverTrigger>
              <PopoverContent className="text-gray-300">
                <h2
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
          onClick={() => setOpenDailog(true)}
          className="rounded-full border-gray-400 text-black hover:bg-gray-700"
        >
            Sign In
          </Button>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center bg-gray-700 text-white hover:bg-gray-800"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
