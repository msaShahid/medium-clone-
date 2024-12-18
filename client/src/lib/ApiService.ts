import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { USER_POSTS_URL } from "./ApiEndPoint";

export async function fetchUserPosts(user:CustomUser): Promise<Array<Post> | null> {
    
    const res = await fetch(USER_POSTS_URL, {
        headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
        }
    });

    if(!res.ok){
        throw new Error("failed to fetch data")
    }

    const response = res.json()

    if(response){
        return response
    }

    return null

}