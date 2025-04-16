"use client";
import { Hash, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { primaryNavItems } from "@/utils";
import Image from "next/image";
import SearchForm from "./search-form";
import UserProfile from "./user-profile";

import todoooLogo from "@/public/logo.svg";
import { useEffect, useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AddProjectDialog from "../projects/add-project-dialog";

export default function MobileNav({
  navTitle = "",
  navLink = "#",
}: {
  navTitle?: string;
  navLink?: string;
}) {

  const projectList = useQuery(api.projects.getProjects);
  const [navItems, setNavItems] = useState([...primaryNavItems]);

  const renderItems = (projectList: Array<Doc<"projects">>) => {
    return projectList.map(({ _id, name }, idx) => ({
      name,
      link: `/loggedin/projects/${_id.toString()}`,
      icon: <Hash className="w-4 h-4" />,
    }));
  };

  useEffect(() => {
    if (projectList) {
      const projectItems = renderItems(projectList);
      setNavItems([...primaryNavItems, ...projectItems]);
    }
  }, [projectList]);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <UserProfile />

            {primaryNavItems.map(({ name, icon, link }, idx) => (
              <Link
                key={idx}
                href={link}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
              >
                {icon}
                {name}
              </Link>
            ))}
            {/* My Projects Section with AddProjectDialog */}
            <div className="flex items-center mt-6 mb-2">
              <p className="flex flex-1 text-base">My Projects</p>
              <AddProjectDialog />
            </div>

            {/* Render Project Links */}
            {projectList?.map(({ _id, name }) => (
              <Link
                key={_id}
                href={`/loggedin/projects/${_id.toString()}`}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground"
              >
                <Hash className="w-4 h-4" />
                {name}
              </Link>
            ))}
          </nav>
         
        </SheetContent>
      </Sheet>
      <div className="flex items-center md:justify-between w-full gap-1 md:gap-2 py-2">
        <div className="lg:flex-1">
          <Link href={navLink}>
            <p className="text-sm font-semibold text-foreground/70 w-24">
              {navTitle}
            </p>
          </Link>
        </div>
        <div className="place-content-center w-full flex-1">
          <SearchForm />
        </div>
        <div className="place-content-center w-16 h-16 lg:w-24 lg:h-24">
          <Image alt="logo" src={todoooLogo} />
        </div>
      </div>
    </header>
  );
}
