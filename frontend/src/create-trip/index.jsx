import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { TripService } from "../service/TripService";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Oops! Please fill out all required details.");
      return;
    }

    setLoading(true);
    toast("🚀 Planning your trip... Hang tight!");
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const parsedTripData = JSON.parse(TripData);
      const tripToSave = {
        userEmail: user?.email,
        userSelection: formData,
        tripData: parsedTripData,
      };

      const savedTrip = await TripService.createTrip(tripToSave);
      setLoading(false);
      navigate("/view-trip/" + savedTrip.id);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save your trip. Please try again.");
    }
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
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
        OnGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold font-workSans text-3xl text-gray-800">
        Plan Your Perfect Getaway ✈️🌍
      </h2>
      <p className="mt-3 text-gray-500 text-lg">
        Answer a few quick questions, and we’ll craft a tailor-made itinerary for your next adventure!
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {/* Destination Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Where do you want to go?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        {/* Days Input */}
        <div>
          <h2 className="text-xl my-3 font-medium">How long is your trip?</h2>
          <Input
            placeholder="Enter the number of days (e.g., 3)"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What’s your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg text-center hover:shadow-md ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who’s joining you on this adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border cursor-pointer rounded-lg text-center hover:shadow-md ${
                  formData?.traveler === item.people && "shadow-lg border-black"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Plan My Trip ✨"
          )}
        </Button>
      </div>

      {/* Dialog for Login */}
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In to Continue</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" className="w-20 mx-auto mb-5" />
              <p className="text-center">
                Please sign in with Google to save your customized trips.
              </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
