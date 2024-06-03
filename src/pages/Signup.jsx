import {Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "../api/query";
import toast from "react-hot-toast";
import { emailRegex, passwordRegex, usernameRegex } from "../utils/regex";

const Signup = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({});
  const mutationSginUp = useSignUp();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password)
      return toast.error("Please fill out all fileds!");
    if (!usernameRegex.test(formData.username)) {
      return toast.error(
        "Username can only contain lowercase letters, numbers, and underscores, and must not contain spaces."
      );
    }

    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!passwordRegex.test(formData.password)) {
      return toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    try {
      mutationSginUp.mutate(
        { formData },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            navigator("/sign-in");
          },
          onError: (error) => {
            toast.error(error.message);
            console.log(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex gap-5 p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          {" "}
          <Link
            to="/"
            className=" whitespace-nowrap text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 main-color-bg rounded-lg text-white">
              Salman's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 text-gray-500 font-semibold">
            Join to our community to get more information technology, register
            now!
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="!w-full main-color-bg dark:main-color-bg"
              type="submit"
              disabled={mutationSginUp.isPending}
            >
              {mutationSginUp.isPending ? (
                <>
                  <Spinner size="20" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link className="text-blue-500" to="/sign-in">
              Sgin In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
