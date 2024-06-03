import { Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById, useUpdatePost } from "../api/query";
import toast from "react-hot-toast";

import { supabase } from "../supabase";
import LoadingSpinner from "../components/LoadingSpinner";
export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    image: "",
  });
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { data, isLoading } = getPostById(postId);
  const mutationUpdatePost = useUpdatePost();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      if (data) {
        setFormData(data.posts[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [postId, data]);
  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast("Please select an image", {
          icon: "⚠",
        });
        return;
      }
      const fileName = new Date().getTime() + "-" + file.name;
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("photoBlog")
        .upload(fileName, file);
      if (error) {
        toast.error("Image upload failed");
        setLoading(false);
        console.error(error);
        return;
      }
      setLoading(false);
      toast.success("Image uploaded");
      setFormData({
        ...formData,
        image: `${impor.meta.env.VITE_SUPABASE_IMG_URL}${data.path}`,
      });
    } catch (error) {
      toast.error("Image upload failed");
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataId = formData._id;
    const currentUserId = currentUser._id;
    try {
      mutationUpdatePost.mutate(
        { formData, formDataId, currentUserId },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            toast.success("Post Updated!");
            return navigate(`/`);
          },
          onError: (error) => {
            console.log(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                title: e.target.value,
              }))
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: e.target.value,
              }))
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 main-color-border border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="main-color-bg dark:main-color-bg"
            size="sm"
            onClick={handleUploadImage}
            disabled={loading}
          >
            {loading ? "Uploading" : "Upload Image"}
          </Button>
        </div>
        {formData.image &&
          (loading ? (
            <div className="flex justify-center items-center h-72">
              <Spinner size="xl" />
            </div>
          ) : (
            <img
              loading="lazy"
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          ))}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) =>
            setFormData((prevFormData) => ({ ...prevFormData, content: value }))
          }
        />
        <Button
          disabled={mutationUpdatePost.isPaused}
          type="submit"
          className="dark:main-color-bg main-color-bg"
        >
          {mutationUpdatePost.isPending ? "Loading..." : "Update post"}
        </Button>
      </form>
    </div>
  );
}
