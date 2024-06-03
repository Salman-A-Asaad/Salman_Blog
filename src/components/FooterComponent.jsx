import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsLinkedin, BsWhatsapp } from "react-icons/bs";
export default function FooterComponent() {
  const connection = [
    {
      icon: BsGithub,
      link: "https://github.com/Salman-A-Asaad",
    },
    {
      icon: BsWhatsapp,
      link: "https://wa.me/0988514601",
    },
    {
      icon: BsLinkedin,
      link: "https://www.linkedin.com/in/salman-asaad",
    },
    {
      icon: BsFacebook,
      link: "https://www.facebook.com/profile.php?id=100010923374122",
    },
  ];
  return (
    <Footer
      container
      className="border border-t-2 main-color-border rounded-none"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center sm:justify-start">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 main-color-bg rounded-lg text-white">
                Salman's
              </span>
              Blog
            </Link>
          </div>
          <div className="flex items-center justify-center my-3 sm:my-0 font-semibold">
            {" "}
            <Footer.Copyright
              href="#"
              by="Salman's blog"
              year={new Date().getFullYear()}
            />
          </div>
          <div className="flex gap-6  justify-center items-baseline sm:justify-end">
            {connection.map((ele, index) => {
              return (
                <Footer.Icon
                  className="main-color hover:main-color-alt transition-all duration-200 "
                  key={index}
                  href={ele.link}
                  icon={ele.icon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Footer>
  );
}
