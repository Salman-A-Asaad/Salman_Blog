import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { useSignOut } from "../../api/query";
import toast from "react-hot-toast";
const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const mutationSignOut = useSignOut();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      mutationSignOut.mutate(
        {},
        {
          onSuccess: (data) => {
            if (!data.isData) {
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
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              className="cursor-pointer"
              active={tab === "profile"}
              icon={CiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                as="div"
                icon={IoDocumentTextOutline}
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item active={tab === "users"} as="div" icon={FaUsers}>
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                as="div"
                icon={FaComment}
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={FaArrowRightFromBracket}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sgin Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
export default DashSidebar;
