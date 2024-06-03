import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPostsUser, getMorePosts, useDeletePost } from "../../api/query";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
export default function DashPosts() {
  const tableHeader = [
    "Date updated",
    "Post image",
    "Post title",
    "Category",
    "Delete",
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [numberShowMore, setNumberShowMore] = useState(0);
  const mutationDelete = useDeletePost();
  const { data, isLoading, isError, error } = getPostsUser(
    currentUser.isAdmin,
    currentUser._id
  );
  const {
    data: morePosts,
    isLoading: loadingMore,
    refetch,
  } = getMorePosts(currentUser._id, numberShowMore);
  const id = currentUser._id;
  useEffect(() => {
    data && setUserPosts(data.posts);
    if (data && data.posts.length < 9) {
      setShowMore(false);
    }
  }, [currentUser._id, data]);
  useEffect(() => {
    if (morePosts) {
      setUserPosts((prevPosts) => [...prevPosts, ...morePosts.posts]);
      if (morePosts.posts.length < 9) {
        setShowMore(false);
      }
    }
  }, [morePosts]);
  useEffect(() => {
    if (numberShowMore > 0) refetch();
  }, [numberShowMore]);
  const handleShowMore = () => {
    const startIndex = userPosts.length;
    setNumberShowMore(startIndex);
  };

  const handleDelete = () => {
    setShowModal(false);
    try {
      mutationDelete.mutate(
        { postIdToDelete, id },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            setUserPosts(
              userPosts.filter((post) => post._id !== postIdToDelete)
            );
            setShowModal(false);
            toast.success("Post deleted");
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
      {currentUser.isAdmin && userPosts && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              {tableHeader.map((ele, index) => {
                return <Table.HeadCell key={index}>{ele}</Table.HeadCell>;
              })}
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        loading="lazy"
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              disabled={loadingMore}
              onClick={handleShowMore}
              className="w-full main-color bg-transparent self-center text-sm my-7 dark:hover:!bg-transparent transition-all duration-150 hover:scale-[1.1]"
            >
              {loadingMore ? "Loading..." : "Show more"}
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
