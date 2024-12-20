// Importing required modules
import type { Metadata } from "next";

// Importing custom global styles
import "./globals.css";

// Set the metadata for the entire application
export const metadata: Metadata = {
	title: "Alignify",
	description: "Where teams align and projects shine.",
};

// Defining the Root Layout for the entire application
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={"antialiased min-h-screen"}>
				{children}
			</body>
		</html>
	);
};
