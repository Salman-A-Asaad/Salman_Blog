import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllComments,
  getMoreComments,
  useDeleteComment,
} from "../../api/query";
import toast from "react-hot-toast";
import ModalDelete from "../ModalDelete";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
export default function DashComments() {
  const tableHeader = [
    "Date updated",
    "Comment content",
    "Number of likes",
    "PostId",
    "UserId",
    "Delete",
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [numberShowMore, setNumberShowMore] = useState(0);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const { data, isLoading, isError, error } = getAllComments(
    currentUser.isAdmin
  );
  const mutationDelete = useDeleteComment();
  const {
    data: moreComments,
    isLoading: loadingMore,
    refetch,
  } = getMoreComments(numberShowMore);
  useEffect(() => {
    data && setComments(data.comments);
    if (data && data.comments.length < 9) {
      setShowMore(false);
    }
  }, [currentUser._id, data]);
  useEffect(() => {
    if (moreComments) {
      setComments((prevComments) => [
        ...prevComments,
        ...moreComments.comments,
      ]);
      if (moreComments.comments.length < 9) {
        setShowMore(false);
      }
    }
  }, [moreComments]);
  useEffect(() => {
    if (numberShowMore > 0) refetch();
  }, [numberShowMore]);
  const handleShowMore = () => {
    const startIndex = comments.length;
    setNumberShowMore(startIndex);
  };

  const handleDelete = async (commentIdToDelete) => {
    setShowModal(false);
    try {
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
            setShowModal(false);
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
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error error={error} />;
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              {tableHeader.map((ele, index) => {
                return <Table.HeadCell key={index}>{ele}</Table.HeadCell>;
              })}
            </Table.Head>
            {comments.map((comment, index) => (
              <Table.Body className="divide-y" key={index}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              disabled={loadingMore}
              onClick={handleShowMore}
              className="w-full main-color bg-transparent self-center text-sm my-7 dark:hover:!bg-transparent transition-all duration-150 hover:scale-[1.1"
            >
              {loadingMore ? "Loading..." : "Show more"}
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <ModalDelete
        showModal={showModal}
        setShowModal={setShowModal}
        handleDeleteClick={handleDelete}
        idToDelete={commentIdToDelete}
      />
    </div>
  );
}
