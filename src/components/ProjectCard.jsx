import { IoLogoGithub } from "react-icons/io";
import { VscLinkExternal } from "react-icons/vsc";
export default function ProjectCard({ project }) {
  return (
    <div className="group relative w-full border main-color-border hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[350px] transition-all">
      <a href={project.git} target="_blank">
        <img
          loading="lazy"
          style={{
            objectPosition: project.title === "Snapgram" ? "left" : "top",
          }}
          src={project.img}
          alt="project cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </a>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{project.title}</p>

        <div className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 transition-all duration-300 py-2 flex items-center justify-between px-5 pb-5">
          <a
            className="main-color text-2xl transition-all duration-200 dark:hover:text-white hover:text-gray-600"
            href={project.git}
            target="_blank"
          >
            <IoLogoGithub />
          </a>
          <a
            target="_blank"
            className="main-color text-2xl transition-all duration-200 dark:hover:text-white hover:text-gray-600"
            href={project.demo}
          >
            <VscLinkExternal />
          </a>
        </div>
      </div>
    </div>
  );
}
