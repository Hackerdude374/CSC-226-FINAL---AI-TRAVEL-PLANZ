import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold font-workSans text-[50px] text-center mt-16">
        <span className="text-[#558493]">
          Let AI Plan Your Dream Trip:
        </span>{" "}
        Stress-Free Itineraries Made Just for You
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Say goodbye to travel stress! Get personalized itineraries that match 
        your vibe, your budget, and your bucket list.
      </p>

      <Link to={"/create-trip"}>
        <Button className="bg-[#558493]"> Start Planning for Free </Button>
      </Link>

      <img src="/trip.gif" className="animate-fadeIn" />
    </div>
  );
}

export default Hero;
