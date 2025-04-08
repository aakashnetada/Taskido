import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { api } from "@/convex/_generated/api";
  import { useAction, useMutation } from "convex/react";
  import { EllipsisIcon, Trash2 } from "lucide-react";
  import { useRouter } from "next/navigation";
  import { useForm } from "react-hook-form";
  import { useToast } from "../ui/use-toast";
  import { Id } from "@/convex/_generated/dataModel";
  import { AI_LABEL_ID, PERSONAL_LABEL_ID } from "@/utils";
  
  export default function DeleteLabel({
    labelId,
  }: {
    labelId: Id<"labels">;
  }) {
    const form = useForm({ defaultValues: { name: "" } });
    const { toast } = useToast();
    const router = useRouter();
  
    const deleteLabel = useAction(api.labels.deleteLabelAndItsTasks);
  
    const onSubmit = async () => {
      if (labelId ===  PERSONAL_LABEL_ID || labelId === AI_LABEL_ID) {
        toast({
          title: "🤗 Just a reminder",
          description: "System labels are protected from deletion.",
          duration: 3000,
        });
      } else {
        const deleteTaskId = await deleteLabel({ labelId });
  
        if (deleteTaskId !== undefined) {
          toast({
            title: "🗑️ Successfully deleted a label",
            duration: 3000,
          });
          router.push(`/loggedin/filter-labels`);
        }
      }
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisIcon className="w-5 h-5 text-foreground hover:cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="w-40 lg:w-56">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <button type="submit" className="flex gap-2">
                <Trash2 className="w-5 h-5 rotate-45 text-foreground/40" /> Delete
                Label
              </button>
            </form>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }