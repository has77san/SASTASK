"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [Data, setData] = useState({
    user: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
    },
    company_name: "",
    department: "",
    position: "",
  });


  const handleSubmit = async () => {
     try {
    const response = await axios.post("https://dev42025.pythonanywhere.com/api/organization/user/signup/", Data,{
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      if (response.status === 201) {
      alert("Registration successful! Redirecting to verification...");
      router.push("/verify"); 
    } else {
      alert("Unexpected response. Please try again.");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
  }
    
  }

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;

    if (name.startsWith("user.")) {
      const field = name.split(".")[1];
      setData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          [field]: value,
        },
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="sm:col-span-1">
                  <Label>First Name<span className="text-error-500">*</span></Label>
                  <Input
                    type="text"
                    name="user.name"
                    placeholder="Enter your first name"
                    value={Data.user.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Last Name (used here as position for demo purposes) */}
                <div className="sm:col-span-1">
                  <Label>Position</Label>
                  <Input
                    type="text"
                    name="position"
                    placeholder="Your position"
                    value={Data.position}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  name="user.email"
                  placeholder="Enter your email"
                  value={Data.user.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="text"
                  name="user.phone_number"
                  placeholder="Enter your phone"
                  value={Data.user.phone_number}
                  onChange={handleInputChange}
                />
              </div>

              {/* Company Name */}
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="company_name"
                  placeholder="Enter company name"
                  value={Data.company_name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Department */}
              <div>
                <Label>Department</Label>
                <Input
                  type="text"
                  name="department"
                  placeholder="Enter department"
                  value={Data.department}
                  onChange={handleInputChange}
                />
              </div>

              {/* Password */}
              <div>
                <Label>Password<span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="user.password"
                    value={Data.user.password}
                    onChange={handleInputChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Submit */}
              <div>
                <button
                onClick={handleSubmit}
                   type="button"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account?
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
