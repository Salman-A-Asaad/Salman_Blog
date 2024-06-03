import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DashComments,
  DashPosts,
  DashProfile,
  DashSidebar,
  DashUsers,
  DashboardComp,
} from "../components";
const Dashboard = () => {
  const location = useLocation();
  const [tap, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-56">
        <DashSidebar />
      </div>
      {tap === "profile" && <DashProfile />}
      {tap === "posts" && <DashPosts />}
      {tap === "users" && <DashUsers />}
      {tap === "comments" && <DashComments />}
      {tap === "dash" && <DashboardComp />}
    </div>
  );
};

export default Dashboard;
