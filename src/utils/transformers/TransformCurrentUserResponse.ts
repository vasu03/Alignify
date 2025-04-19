// Import required modules
import { Models } from "node-appwrite";
// Import custom types
import { SanitizedCurrentUserType } from "@/types/SanitizedCurrentUserType";

// Define the function to transform the current user response
export const transformCurrentUserResponse = (user: Models.User<Models.Preferences>): SanitizedCurrentUserType => {
    return {
        id: user.$id,
        name: user["name"],
        email: user["email"],
        createdAt: user.$createdAt
    }
};