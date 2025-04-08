import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon, Github, BookOpenIcon, Brain } from "lucide-react"; // Importing icons

interface LinkItem {
  icon: ReactNode;
  text: string;
  url: string;
}

const links: LinkItem[] = [
    { icon: <Github className="w-5 h-5" />, text: "Github Repo", url: "https://github.com/aditya-yadav08/Todooo-App-NextJS-Scalable" },
  { icon: <LinkIcon className="w-5 h-5" />, text: "Convex", url: "https://www.convex.dev/" },
  { icon: <BookOpenIcon className="w-5 h-5" />, text: "Convex Docs", url: "https://docs.convex.dev/home" },
  { icon: <Brain className="w-5 h-5" />, text: "Google Gemini AI", url: "https://ai.google.dev/gemini-api/docs" },
];

export default function LinksCard() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl">Important Links</CardTitle>
        <CardDescription className="text-sm">
          Access to github repo and all the resources for you to follow along.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {links.map((link, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <a href={link.url} target="_blank" className="flex items-center gap-2 hover:text-primary text-sm">
                {link.icon}
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
