// Importing required modules
import React, { useState } from "react";
import Link from "next/link";

// Importing pre-build React Hooks
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importing the pre-defined UI components 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Importing Icon components
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { UserPlus } from "lucide-react";

// Importing the custom Form validation schemas and types
import { SignUpSchema, SignUpSchemaType } from "../schemas/SignUp_Schema";

// Importing the custom hook to handle the sign-up mutation
import { useSignUp } from "../api/use-signup";

// Defining the SignUpCard component
const SignUpCard = () => {
    // Custom mutation hook to handle the sign-up
    const { mutate } = useSignUp();

    // Sign Up form validation using the custom validation schema
    const signUpForm = useForm<SignUpSchemaType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // Function to handle the Sign Up form submission
    const handleFormSubmit = (values: SignUpSchemaType) => {
        // Calling the custom mutation hook to handle the sign-up with the form values
        mutate({ json: values });
    }

    // TSX for rendering the SignUpCard component
    return (
        <Card className="w-[95%] sm:w-[85%] md:w-[487px] !px-8 !py-6 border-none shadow-lg shadow-gray-300" >
            <CardHeader className="p-0">
                <CardTitle className="text-2xl font-semibold text-center">Sign Up</CardTitle>
                <CardDescription className="text-center">Sign up to create a new account</CardDescription>
            </CardHeader>
            <Separator className="my-5 w-[95%] mx-auto" />
            <CardContent className="p-0">
                {/* Container to render the Sign Up form */}
                <Form {...signUpForm} >
                    <form onSubmit={signUpForm.handleSubmit(handleFormSubmit)} className="flex flex-col space-y-3 md:w-[85%] mx-auto">
                        <FormField
                            name="name"
                            control={signUpForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            name="email"
                            control={signUpForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Email" type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={signUpForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            name="confirmPassword"
                            control={signUpForm.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Confirm Password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button type="submit" variant={"primary"} size={"lg"} className="w-full">
                            <UserPlus />
                            Sign Up
                        </Button>
                    </form>
                </Form>

                {/* Container to render the Separator */}
                <div className="flex items-center gap-3 my-5">
                    <Separator />
                    <span className="text-muted-foreground">or</span>
                    <Separator />
                </div>

                {/* Container to render the Alternate Sign Up options button */}
                <CardContent className="flex flex-col space-y-4 md:w-[85%] mx-auto p-0">
                    <Button variant={"secondary"} size={"lg"} disabled={false} className="w-full text-xs xl:text-sm">
                        <FcGoogle className="sm:!h-6 sm:!w-6" />
                        Sign Up with Google
                    </Button>
                    <Button variant={"secondary"} size={"lg"} disabled={false} className="w-full text-xs xl:text-sm ">
                        <FaGithub className="sm:!h-5 sm:!w-5" />
                        Sign Up with GitHub
                    </Button>
                </CardContent>

                {/* Container to render the Sign In link */}
                <CardDescription className="text-center mt-4 text-xs sm:text-sm">
                    Already have an account? <Link href="/sign-in" className="text-blue-600 hover:underline">Sign In</Link>
                </CardDescription>

                {/* Container to render the Privacy Policy and Terms of Service links */}
                <CardDescription className="text-center mt-4 text-[10px] sm:text-xs">
                    By Signing up, you agree to our&nbsp;
                    <Link href="/sign-in" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    &nbsp;and&nbsp;
                    <Link href="/sign-in" className="text-blue-600 hover:underline">Terms of Service</Link>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

// Exporting the SignUpCard component
export default SignUpCard;