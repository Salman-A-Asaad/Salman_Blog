import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { useSignOut } from "../api/query";
import toast from "react-hot-toast";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const mutationSignOut = useSignOut();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  useEffect(() => {
    const element = document.getElementById(":r1:");
    if (element) {
      const handleMouseOver = () => {
        element.style.setProperty("background", "none", "important");
      };

      element.addEventListener("mouseover", handleMouseOver);

      return () => {
        element.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [currentUser]);
  const handleSignout = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 main-color-bg rounded-lg text-white">
          Salman's
        </span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Link to="/search">
        <Button
          className="w-12 h-10 lg:hidden hover:!main-color-bg hover:!text-white "
          color="gray"
          pill
        >
          <AiOutlineSearch />
        </Button>
      </Link>

      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline main-color-bg dark:main-color-bg"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            as="div"
            arrowIcon={false}
            inline
            label={
              <div className="rounded-full w-fit overflow-hidden">
                {" "}
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item as="div">Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item as="div" onClick={handleSignout}>
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="main-color-bg dark:main-color-bg">
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className={`${path === "/" ? "main-color" : ""} hover:main-color-alt`}
          as={"div"}
        >
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link
          className={`${
            path === "/projects" ? "main-color" : ""
          } hover:main-color-alt`}
          as={"div"}
        >
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
