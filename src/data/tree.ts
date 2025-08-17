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
          href: "/projects/sem"
        },
        {
          id: "proj-2",
          title: "Portfolio",
          subtitle: "React + Tailwind",
          imageUrl: "/assets/portfolio-thumb.png",
          href: "/projects/portfolio"
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
      href: "/contact"
    }
  ]
};
