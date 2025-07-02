"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Verify() {
  const [Data, setData] = useState({
    email: "",
    otp: "",
  });
  const router = useRouter();


  const handleSubmit = async () => {
     try {
    console.log("Data to be sent:", Data);

    const response = await axios.post("https://dev42025.pythonanywhere.com/api/user/verify/otp/", Data,{
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      
      if(response.status === 'success' || response.status === 200) {
        router.push("/signin"); 
      }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
    
  }

  const handleInputChange = (e: any) => {
  const { name, value } = e.target;

  setData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/sign up"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to sign up
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Verify
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verify your account by entering the OTP sent to your email.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">

              {/* Email */}
              <div>
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={Data.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label>OTP</Label>
                <Input
                  type="text"
                  name="otp"
                  placeholder="Enter your phone"
                  value={Data.otp}
                  onChange={handleInputChange}
                />
              </div>


              {/* Submit */}
              <div>
                <button
                onClick={handleSubmit}
                   type="button"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Verify
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
