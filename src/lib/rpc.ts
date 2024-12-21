// Importing required modules
import { hc } from "hono/client";

// Importing the App server type 
import { AppType } from "@/app/api/[[...route]]/route";

// Creating a new Hono client instance to handle the API requests
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);