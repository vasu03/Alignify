// Importing required modules
import { Button } from "@/components/ui/button";
import React from "react"

// Defining the page component
const page = () => {

	// TSX for rendering the page component
	return (
		<div className="flex p-4 gap-4 bg-background ">
			<Button variant="primary" >Primary</Button>
			<Button variant="secondary" >Secondary</Button>
			<Button variant="tertiary" >Tertiary</Button>
			<Button variant="destructive" >Destructive</Button>
			<Button variant="ghost" >Ghost</Button>
			<Button variant="outline" >Outline</Button>
			<Button variant="link" >Link</Button>
			<Button variant="muted" >Muted</Button>
		</div>
	);
};

// Exporting the page component
export default page;