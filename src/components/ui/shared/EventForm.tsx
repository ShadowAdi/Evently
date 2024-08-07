"use client";
import React, { useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/validator";
import { eventDefaultValues } from "../../../../constants";
import Dropdown from "./Dropdown";
import { Textarea } from "../textarea";
import { FileUploader } from "./FileUploader";
import { Calendar, DollarSign, Link, LocateIcon } from "lucide-react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../checkbox";
import { useUploadThing } from "@/lib/UploadThing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/mongodb/actions/event.action";
import { IEvent } from "@/lib/mongodb/database/models/Event.model";

type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    let uploadImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadImages = await startUpload(files);
      if (!uploadImages) {
        return;
      }
      uploadImageUrl = uploadImages[0].url;
    }

    if (type === "Create") {
      try {
        const newEvents = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          userId,
          path: "/profile",
        });
        if (newEvents) {
          form.reset();
          router.push(`/events/${newEvents?._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });
        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent?._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event Title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <LocateIcon size={24} className="text-gray-500" />
                    <Input
                      placeholder="Event Location or Online"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Calendar size={24} className="text-gray-500" />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Start Date:{" "}
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      className="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Calendar size={24} className="text-gray-500" />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      End Date:{" "}
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time"
                      dateFormat={"MM/dd/yyyy h:mm aa"}
                      className="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <DollarSign size={24} className="text-gray-500" />
                    <Input
                      {...field}
                      type="number"
                      placeholder="Price"
                      className="p-regular-16 border-0 bg-gray-50 outline-offset-0 focus:border-0 focus-visible:ring-0
                    focus-visible:ring-offset-0"
                    />

                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none  peer-disabled:cursor-not-allowed  peer-disabled:opacity-70 "
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary-500 "
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] overflow-hidden rounded-full bg-gray-50 px-4 py-2">
                    <Link size={24} className="text-gray-500" />
                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting}
          className="button col-span-2  w-full "
        >
          {form?.formState?.isSubmitting ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
