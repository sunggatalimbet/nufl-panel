"use client";

import { useForm } from "react-hook-form";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  seasonStartYear: z.string().regex(/^\d{2}$/, "Must be 2 digits"),
  seasonEndYear: z.string().regex(/^\d{2}$/, "Must be 2 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function TournamentForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      seasonStartYear: "",
      seasonEndYear: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(`${data.name} ${data.seasonStartYear}/${data.seasonEndYear}`);
    form.reset();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-7 w-7 bg-white p-0 hover:bg-gray-50"
        >
          <Plus className="h-4 w-4 text-black" />
          <span className="sr-only">Add new tournament</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-2 w-64 bg-white p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-black focus-visible:outline-none focus-visible:ring-0"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Tournament name"
                      className="h-7 border-gray-200 px-2 text-xs"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex w-1/2 items-center space-x-2">
              <FormLabel className="text-xs" htmlFor="seasonStartYear">
                Season:
              </FormLabel>
              <FormField
                control={form.control}
                name="seasonStartYear"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        id="seasonStartYear"
                        placeholder="23"
                        maxLength={2}
                        className="h-7 w-12 border-gray-200 px-2 text-center text-xs"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span className="text-xs">/</span>
              <FormField
                control={form.control}
                name="seasonEndYear"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        id="seasonEndYear"
                        placeholder="24"
                        maxLength={2}
                        className="h-7 w-12 border-gray-200 px-2 text-center text-xs"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-2 h-7 w-full text-xs">
              Add Tournament
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
