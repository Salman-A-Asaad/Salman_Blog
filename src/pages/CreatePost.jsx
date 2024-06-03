import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../api/query";
import toast from "react-hot-toast";
import { supabase } from "../supabase";
export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const mutationCreatePost = useCreatePost();
  const navigate = useNavigate();
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
        image: `${import.meta.env.VITE_SUPABASE_IMG_URL}${data.path}`,
      });
    } catch (error) {
      toast.error("Image upload failed");
      setLoading(false);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutationCreatePost.mutate(
        { formData },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            } else {
              toast.success("Post Created!");
              navigate(`/`);
            }
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
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
            className="main-color-border text-white !main-color-bg"
            size="sm"
            onClick={handleUploadImage}
            disabled={loading}
          >
            {loading ? "Uploading" : "Upload Image"}
          </Button>
        </div>

        {formData.image && (
          <img
            loading="lazy"
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" className="!main-color-bg">
          Publish
        </Button>
      </form>
    </div>
  );
}
