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
import { UserCheck } from "lucide-react";

// Importing the custom Form validation schemas and types
import { SignInSchema, SignInSchemaType } from "../schemas/SignIn_Schema";

// Defining the SignInCard component
const SignInCard = () => {
	// Sign In form validation using the custom validation schema
	const signInForm = useForm<SignInSchemaType>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// Function to handle the Sign In form submission
	const onSubmit = (values: SignInSchemaType)	=> {
		console.log({values});
	}

	// TSX for rendering the SignInCard component
	return (
		<Card className="w-[95%] sm:w-[80%] md:w-[487px] !p-8 border-none shadow-lg shadow-gray-300" >
			<CardHeader className="p-0">
				<CardTitle className="text-2xl font-semibold text-center">Sign In</CardTitle>
				<CardDescription className="text-center text-xs sm:text-sm">Sign in to your account to continue</CardDescription>
			</CardHeader>
			<Separator className="my-6 w-[95%] mx-auto" />
			<CardContent className="p-0">
				{/* Container to render the Sign In form */}
				<Form {...signInForm} >
					<form onSubmit={signInForm.handleSubmit(onSubmit)} className="flex flex-col space-y-4 md:w-[85%] mx-auto">
						<FormField
							name="email"
							control={signInForm.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} type="email" placeholder="Enter Email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={signInForm.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} type="password" placeholder="Enter Password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)} />
						<Button type="submit" variant={"primary"} size={"lg"} className="w-full">
							<UserCheck />
							Sign In
						</Button>
					</form>
				</Form>

				{/* Container to render the Separator */}
				<div className="flex items-center gap-3 my-6">
					<Separator />
					<span className="text-muted-foreground">or</span>
					<Separator />
				</div>

				{/* Container to render the Alternate Sign In options button */}
				<CardContent className="flex flex-col space-y-4 md:w-[85%] mx-auto p-0">
					<Button variant={"secondary"} size={"lg"} disabled={false} className="w-full text-xs xl:text-sm">
						<FcGoogle className="sm:!h-6 sm:!w-6" />
						Sign In with Google
					</Button>
					<Button variant={"secondary"} size={"lg"} disabled={false} className="w-full text-xs xl:text-sm ">
						<FaGithub className="sm:!h-5 sm:!w-5" />
						Sign In with GitHub
					</Button>
				</CardContent>

				{/* Container to render the Sign Up link */}
				<CardDescription className="text-center mt-4 text-xs sm:text-sm">
					Don't have an account? <Link href="/sign-up" className="text-blue-600 hover:underline">Sign Up</Link>
				</CardDescription>
			</CardContent>
		</Card>
	);
};

// Exporting the SignInCard component
export default SignInCard;