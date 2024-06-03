import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useSignIn } from "../api/query";
import toast from "react-hot-toast";
import { emailRegex, passwordRegex } from "../utils/regex";

const Signip = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [formData, setFormData] = useState({});
  const mutationSginIn = useSignIn();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return dispatch(signInFailure("Please fill out all fileds!"));
    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address.");
    }

    if (!passwordRegex.test(formData.password)) {
      return toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }
    try {
      mutationSginIn.mutate(
        { formData },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              return toast.error(data.message);
            } else {
              dispatch(signInSuccess(data));
              navigator("/");
            }
          },
          onError: (error) => {
            console.log(error.message);
          },
        }
      );
    } catch (err) {
      dispatch(signInFailure(err.message));
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
              disabled={mutationSginIn.isPending}
            >
              {mutationSginIn.isPending ? (
                <>
                  <Spinner size="20" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link className="text-blue-500" to="/sign-up">
              Sgin Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signip;
