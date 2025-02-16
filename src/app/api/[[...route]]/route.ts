// Import required modules
import { Hono } from "hono";
import { handle } from "hono/vercel";

// Import custom authentication routes
import authRoute from "@/features/auth/server/route";

// Create a new Hono instance for the API with a base path of `/api`
const app = new Hono().basePath("/api");

// Add the authentication routes to the Hono app
// All routes will be chained under `/api/auth` to leverage Hono's RPC capabilities
const routes = app.route("/auth", authRoute);

// Export explicit handlers for GET and POST methods to integrate with Vercel serverless functions
export const GET = handle(app);
export const POST = handle(app);

// Export the type of the entire application API for end-to-end type safety
export type AppType = typeof routes;