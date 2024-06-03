import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import {
  useCreateComment,
  getAllCommentsPosts,
  useLikeComment,
  useDeleteComment,
} from "../../api/query";
import toast from "react-hot-toast";
import Error from "../Error";
import LoadingSpinner from "../LoadingSpinner";
import ModalDelete from "../ModalDelete";
export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const mutation = useCreateComment();
  const mutationLike = useLikeComment();
  const mutationDelete = useDeleteComment();
  const { data, isError, isLoading, error } = getAllCommentsPosts(postId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    const id = currentUser._id;
    mutation.mutate(
      { comment, postId, id },
      {
        onSuccess: (data) => {
          if (!data.isData) {
            toast.error(data.error);
            return;
          }
          setComment("");
          setCommentError(null);
          setComments([data, ...comments]);
          toast.success("Commet posted");
        },
        onError: (error) => {
          toast.error(error.message);
          console.error(error.message);
          setCommentError(error.message);
        },
      }
    );
  };
  useEffect(() => {
    data && setComments(data);
  }, [postId, data]);

  const handleLikeClick = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      mutationLike.mutate(
        { commentId },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.error);
              return;
            }
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.likes,
                      numberOfLikes: data.likes.length,
                    }
                  : comment
              )
            );
          },
          onError: (error) => {
            console.error(error);
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDeleteClick = async (commentIdToDelete) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      mutationDelete.mutate(
        { commentIdToDelete },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            setComments(
              comments.filter((comment) => comment._id !== commentIdToDelete)
            );
            toast.success("Comment deleted");
          },
          onError: (error) => {
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  if (isError) return <Error error={error} />;
  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            loading="lazy"
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border main-color-border rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button className="!main-color-bg" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {data && comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {data &&
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLikeClick}
                onEdit={handleEditClick}
                onDelete={(commentId) => {
                  console.log("sssss");
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
        </>
      )}
      <ModalDelete
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteClick={handleDeleteClick}
        idToDelete={commentToDelete}
      />
    </div>
  );
}
