"use client";

import useGeolocation from "@/lib/hooks/useGeolocation";
import { Image, Skeleton, Spinner } from "@nextui-org/react";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const LocationDisplay = () => {
  const { location, error, isLoading } = useGeolocation();
  const country = location?.countryName;
  const city = location?.city;
  const countryCode = location?.countryCode;

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center mt-1 mb-8">
        <Skeleton
          isLoaded={!isLoading}
          className=" h-6 w-48 rounded bg-emerald-100"
        />
      </div>
    );
  if (!isLoading && !error)
    return (
      <div className="mt-1 mb-8 flex gap-2 items-center justify-center text-emerald-600">
        <p>
          {city}, {country}
        </p>
        <Image
          src={`https://flagcdn.com/48x36/${countryCode?.toLowerCase()}.png`}
          alt="flag"
          className="w-6 h-6"
        />
      </div>
    );
};

export default LocationDisplay;
