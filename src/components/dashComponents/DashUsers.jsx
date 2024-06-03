import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getMoreUsers, getAllUsers, useDeleteUser } from "../../api/query";
import toast from "react-hot-toast";
import ModalDelete from "../ModalDelete";
import LoadingSpinner from "../LoadingSpinner";
import Error from "../Error";
export default function DashUsers() {
  const tableHeader = [
    "Date created",
    "User image",
    "Username",
    "Email",
    "Admin",
    "Delete",
  ];
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [numberShowMore, setNumberShowMore] = useState(0);
  const mutationDelete = useDeleteUser();
  const { data, isLoading, isError, error } = getAllUsers();
  const {
    data: moreUsers,
    isLoading: loadingMore,
    refetch,
  } = getMoreUsers(numberShowMore);
  useEffect(() => {
    data && setUsers(data.users);
    if (data && data.users.length < 9) {
      setShowMore(false);
    }
  }, [currentUser._id, data]);
  useEffect(() => {
    if (moreUsers) {
      setUsers((prevUsers) => [...prevUsers, ...moreUsers.users]);
      if (moreUsers.users.length < 9) {
        setShowMore(false);
      }
    }
  }, [moreUsers]);
  useEffect(() => {
    if (numberShowMore > 0) refetch();
  }, [numberShowMore]);
  const handleShowMore = () => {
    const startIndex = users.length;
    setNumberShowMore(startIndex);
  };
  const handleDelete = async (userIdToDelete) => {
    try {
      mutationDelete.mutate(
        { userIdToDelete },
        {
          onSuccess: (data) => {
            if (!data.isData) {
              toast.error(data.message);
              return;
            }
            setUsers((prev) =>
              prev.filter((user) => user._id !== userIdToDelete)
            );
            setShowModal(false);
            toast.success("User deleted");
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
      {currentUser.isAdmin && users && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              {tableHeader.map((ele, index) => {
                return <Table.HeadCell key={index}>{ele}</Table.HeadCell>;
              })}
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      loading="lazy"
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              {loadingMore ? "Loading..." : "Show more"}
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <ModalDelete
        handleDeleteClick={handleDelete}
        idToDelete={userIdToDelete}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
}
