import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/data";

export default function Projects() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      <h1 className="text-3xl font-semibold w-full text-center">Pojects</h1>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {projects.map((ele, index) => {
          return <ProjectCard key={index} project={ele} />;
        })}
      </div>
    </div>
  );
}
