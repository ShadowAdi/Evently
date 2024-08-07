"use client";

import {  useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {  Trash } from "lucide-react";
import { deleteEvent } from "@/lib/mongodb/actions/event.action";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
    const pathName=usePathname()
    let [isPending,startTransition]=useTransition()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash width={20} height={20}/>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
          onClick={()=>startTransition(async () => {
            await deleteEvent({eventId,path:pathName})
          })}

          >
                    {isPending ?"Deleting..." :"Delete"}

          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
