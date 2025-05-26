"use client"

// Import required modules
import React, { useRef } from "react";
import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import custom validation schemas
import { CreateWorkspaceSchema } from "../schemas/CreateWorkspace_Schema";

// Import UI components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Import Lucide icons
import { ImageIcon, LoaderIcon } from "lucide-react";

// Importing custom components
import Separator from "@/components/Separator";

// Import custom hook to handle create workspace action
import { useCreateWorkspace } from "../api/use-create-workspace";

// Defining the Prop types
interface CreateWorkspaceFormProps {
    onCancel?: () => void;
};

// Creating a form component to Create New Workspace
const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {

    // setting up a reference for the image input
    const inputRef = useRef<HTMLInputElement>(null);

    // Custom mutation hook to handle Create Workspace
    const { mutate, isPending } = useCreateWorkspace();

    // Create Workspace form validation using custom validation schema
    const form = useForm<z.infer<typeof CreateWorkspaceSchema>>({
        resolver: zodResolver(CreateWorkspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    // function to handle the submission of form
    const onFormSubmit = (values: z.infer<typeof CreateWorkspaceSchema>) => {
        const finalFormValues = {
            ...values,
            imageUrl: values.imageUrl instanceof File ? values.imageUrl : "",
        };
        mutate({ form: finalFormValues }, {
            onSuccess: () => {
                form.reset();
                // TODO : Redirect to newly created workspace
            }
        });
    }

    // function to handle the Workspace Icon change
    const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // grab the uploaded Icon file
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("imageUrl", file);
        }
    }

    // TSX to render the component
    return (
        <Card className="w-full max-w-screen-xl mx-auto h-full shadow-none py-1 px-7">
            <CardHeader className="flex" >
                <CardTitle className="text-xl font-bold text-neutral-700">Create a New Workspace</CardTitle>
            </CardHeader>
            <Separator className={"my-0"} />
            <CardContent className="py-4 px-8" >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            {/* Input for Workspace name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-neutral-700">Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter Workspace name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Input for Workspace image */}
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex gap-x-4 items-center">
                                            {field.value ? (
                                                <div className="size-[72px] relative rounded-md overflow-hidden">
                                                    <Image
                                                        src={field.value instanceof File ?
                                                            URL.createObjectURL(field.value) :
                                                            field.value
                                                        }
                                                        alt="img"
                                                        fill 
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-[72px]" >
                                                    <AvatarFallback>
                                                        <ImageIcon className="size-[36px] text-neutral-400" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-neutral-700 text-sm">Workspace icon</p>
                                                <p className="text-xs text-neutral-500">max 500KB and of type .jpg, .png, .jpeg</p>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".jpg, .png, .jpeg"
                                                    ref={inputRef}
                                                    disabled={isPending}
                                                    onChange={handleIconChange}
                                                    aria-label="workspace image"
                                                />
                                                <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant={"secondary"}
                                                    size={"sm"}
                                                    className="w-fit mt-2 px-4 cursor-pointer"
                                                    onClick={() => inputRef.current?.click()}
                                                >Upload Image</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-3 p-4 my-3">
                            <Button onClick={onCancel} type="button" variant={"secondary"} size={"lg"} className="cursor-pointer" disabled={isPending}>Cancel</Button>
                            <Button type="submit" variant={"primary"} size={"lg"} className="cursor-pointer" disabled={isPending}>Create Workspace</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

// Export the component
export default CreateWorkspaceForm;