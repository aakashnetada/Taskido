import { Calendar, CalendarDays, Grid2X2, Inbox } from "lucide-react";

export const primaryNavItems = [
    {
      id: "primary",
      name: "Inbox",
      link: "/loggedin",
      icon: <Inbox className="w-4 h-4" />,
    },
    {
      name: "Today",
      link: "/loggedin/today",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: "Upcoming",
      link: "/loggedin/upcoming",
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      name: "Filters & Labels",
      link: "/loggedin/filter-labels",
      icon: <Grid2X2 className="w-4 h-4" />,
    },
];

export const GET_STARTED_PROJECT_ID = "k570y8nv6511r7h5090xncwprd72tj9p";
export const PERSONAL_LABEL_ID = "k175wr7jgtk993cesb5agrdc7972tvyy";
export const AI_LABEL_ID = "k17amkrp6rc8ss2jy0erf4hbxn72vfma";
