// Importing required modules
import { Hono } from "hono";
import { handle } from "hono/vercel";

// Importing custom Routes
import authRoute from "@/features/auth/server/route";

// Creating a new Hono instance for the API in our application with the base path as `/api`
const app = new Hono().basePath("/api");

// Adding the authentication routes to the app
// And all the routes will be chained under the routes to use RPC by Hono
const routes = app
    .route("/auth", authRoute)


// Exporting the GET, POST, PATCH, DELETE route handler for our Next-App explicitely
export const GET = handle(app);
export const POST = handle(app);

// Exporting the type for the entire application API to ensure end-to-end type-safety   
export type AppType = typeof routes;