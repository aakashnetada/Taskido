"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { primaryNavItems } from "@/utils";
import { useQuery } from "convex/react";
import { Hash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AddProjectDialog from "../projects/add-project-dialog";
import UserProfile from "./user-profile";
import LinksCard from "./links-card";

interface MyListTitleType {
  [key: string]: string;
}

export default function SideBar() {
  const pathname = usePathname();

  const LIST_OF_TITLE_IDS: MyListTitleType = {
    primary: "",
    projects: "My Projects",
  };

  const projectList = useQuery(api.projects.getProjects);

  const [navItems, setNavItems] = useState([...primaryNavItems]);

  const renderItems = (projectList: Array<Doc<"projects">>) => {
    return projectList.map(({ _id, name }, idx) => {
      return {
        ...(idx === 0 && { id: "projects" }),
        name,
        link: `/loggedin/projects/${_id.toString()}`,
        icon: <Hash className="w-4 h-4" />,
      };
    });
  };
  useEffect(() => {
    if (projectList) {
      const projectItems = renderItems(projectList);
      const items = [...primaryNavItems, ...projectItems];
      setNavItems(items);
    }
  }, [projectList]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-4">
        <div className="flex justify-between h-14 items-center border-b p-1 lg:h-[60px] lg:px-2">
          <UserProfile />
        </div>

        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map(({ name, icon, link, id }, idx) => (
            <div key={idx}>
              {id && (
                <div className="flex items-center mt-6 mb-2">
                  <p className="flex flex-1 text-base">
                    {LIST_OF_TITLE_IDS[id]}
                  </p>
                  {LIST_OF_TITLE_IDS[id] === "My Projects" && (
                    <AddProjectDialog />
                  )}
                </div>
              )}
              <Link
                key={idx}
                href={link}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === link
                    ? "active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary"
                    : "text-foreground "
                )}
              >
                {icon}
                {name}
              </Link>
            </div>
          ))}
        </nav>

        {/* Aligning the LinksCard component beautifully */}
        <div className="px-4 py-4">
          <LinksCard />
        </div>
      </div>
    </div>
  );
}
