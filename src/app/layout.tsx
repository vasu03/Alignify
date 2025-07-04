// Importing required modules
import type { Metadata } from "next";

// Importing required Service providers for the application
import RootProvider from "@/components/providers/RootProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

// Importing pre-defined UI components
import { Toaster } from "@/components/ui/sonner";

// Importing custom global stylesheet
import "./globals.css";

// Set the metadata for the entire application
export const metadata: Metadata = {
	title: "Alignify",
	description: "Where teams align and projects shine.",
};

// Defining the Root Layout for the entire application
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={"antialiased min-h-screen"}>
				<Toaster richColors position="top-right" />
				<RootProvider>
					<NuqsAdapter>
						{children}
					</NuqsAdapter>
				</RootProvider>
			</body>
		</html>
	);
};
