// Pure data, no JSX
export type TreeNode = {
  icon?: any;
  id: string;
  title: string;
  description?: string;   // <-- add
  subtitle?: string;
  imageUrl?: string;          // headshot, project thumbnail, etc
  href?: string;              // external link (GitHub, live demo...)
  children?: TreeNode[];
};

export const TREE_DATA: TreeNode = {
  id: "root",
  title: "Jack Snelgrove",
  subtitle: "Software Developer",
  imageUrl: "/assets/jack.jpg",
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
        { id: "exp-1", title: "DND", subtitle: "Co‑op" },
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
