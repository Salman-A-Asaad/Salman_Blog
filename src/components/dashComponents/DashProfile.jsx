import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import {
  updateSuccess,
  deleteUserSuccess,
  signOutSuccess,
} from "../../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteUser, useSignOut, useUpdateUser } from "../../api/query";
import ModalDelete from "../ModalDelete";
import { supabase } from "../../supabase";
const DashProfile = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [isloading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef();
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState(null);
  const mutationDelete = useDeleteUser();
  const mutationSignOut = useSignOut();
  const mutationUpdateUser = useUpdateUser();
  const id = currentUser._id;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    try {
      if (!imageFile) {
        toast("Please select an image", {
          icon: "⚠",
        });
        return;
      }
      const fileName = new Date().getTime() + "-" + imageFile.name;
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from("photoBlog")
        .upload(fileName, imageFile);
      if (error) {
        toast.error("Image upload failed");
        setIsLoading(false);
        console.error(error);
        return;
      }
      setIsLoading(false);
      toast.success("Image uploaded");
      setFormData({
        ...formData,
        profilePicture: `${import.meta.env.VITE_SUPABASE_IMG_URL}${data.path}`,
      });
    } catch (error) {
      toast.error("Image upload failed");
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleDelete = async (userIdToDelete) => {
    setShowModal(false);
    try {
      mutationDelete.mutate(
        { userIdToDelete },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            dispatch(deleteUserSuccess(data));
            toast.success("User deleted");
            return navigator("/sign-in");
          },
          onError: (error) => {
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSignOut = async () => {
    try {
      mutationSignOut.mutate(
        {},
        {
          onSuccess: (data) => {
            if (data.isData) {
              toast.error(data.message);
              return;
            }
            dispatch(signOutSuccess());
            return navigator("/sign-in");
          },
          onError: (error) => {
            toast.error(error.message);
            console.error(error);
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData === null) {
      return;
    }
    if (isloading) {
      return;
    }
    try {
      mutationUpdateUser.mutate(
        { id, formData },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            toast.success("User updated!");
            return dispatch(updateSuccess(data));
          },
          onError: (error) => {
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
          ref={inputRef}
        />
        <div
          className={`relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full flex items-center justify-center`}
          onClick={() => inputRef.current.click()}
        >
          {currentUser &&
            (isloading ? (
              <Spinner />
            ) : (
              <img
                loading="lazy"
                src={imageUrl || currentUser.profilePicture}
                alt="user"
                className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
              />
            ))}{" "}
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          disabled
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*************"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="!w-full main-color-border bg-white dark:bg-white  main-color hover:text-white hover:!main-color-bg"
          disabled={loading || isloading}
        >
          {loading ? "Loading" : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <Button
              type="button"
              className="!w-full main-color-bg dark:main-color-bg"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span
          onClick={() => {
            setShowModal(true);
          }}
          className="cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      <ModalDelete
        showModal={showModal}
        setShowModal={setShowModal}
        idToDelete={currentUser._id}
        handleDeleteClick={handleDelete}
      />
    </div>
  );
};

export default DashProfile;
