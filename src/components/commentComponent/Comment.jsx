import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Spinner, Textarea } from "flowbite-react";
import { getUser, useSaveChangeComment } from "../../api/query";
import toast from "react-hot-toast";
import Error from "../Error";
import LoadingSpinner from "../LoadingSpinner";
export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  const { data: user, isLoading, error } = getUser(comment.userId);
  const mutation = useSaveChangeComment();
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };
  const handleSave = async () => {
    const commentId = comment._id;
    mutation.mutate(
      { commentId, editedContent },
      {
        onSuccess: (data) => {
          if (!data.isData) {
            toast.error(data.message);
            return;
          }
          toast.success("Saved");
          setIsEditing(false);
          onEdit(comment, editedContent);
        },
        onError: (error) => {
          toast.error(error.message);
          console.error(error.message);
        },
      }
    );
  };
  if (error) return <Error error={error} />;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          loading="lazy"
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                disabled={mutation.isPending}
                className="!main-color-bg"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                disabled={mutation.isPending}
                type="button"
                size="sm"
                className="!bg-white !main-color-border main-color hover:!main-color-bg hover:text-white"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500 "
                } dark:hover:!bg-transparent`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500 dark:hover:!bg-transparent"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:!bg-transparent"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
