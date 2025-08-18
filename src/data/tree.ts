import type { RawNode } from "@/types/tree";

export const TREE_DATA: RawNode = {
  id: "root",
  title: "Jack Snelgrove",
  subtitle: "Software Developer",
  imageUrl: "src/assets/profile.jpeg",
  children: [
    {
      id: "projects",
      title: "Projects",
      children: [
        {
          id: "proj-1",
          title: "SEM App",
          subtitle: "Power Apps + Flow",
          imageUrl: "/assets/sem-thumb.png",
        },
        {
          id: "proj-2",
          title: "Portfolio",
          subtitle: "React + Tailwind",
          imageUrl: "/assets/portfolio-thumb.png",
        }
      ]
    },
    {
      id: "experience",
      title: "Experience",
      children: [
        { id: "exp-1", title: "DND", subtitle: "Co‑op", description:"This is the best job ive ever had" },
        { id: "exp-2", title: "TrueContext", subtitle: "Co‑op" }
      ]
    },
    {
      id: "contact",
      title: "Contact",
      links:[
        {url:"https://github.com/JSnelgrove", label: "GitHub", icon:"/src/assets/GitHub-Logo.png"}, 
        {url:"https://www.linkedin.com/in/jack-s-19a982191/", label: "LinkedIn", icon:"/src/assets/LinkedIn_icon.png"}
      ]
    }
  ]
};
