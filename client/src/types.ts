
type Post = {
    id: number;
    user_id: number;
    title: string;
    image: string | null;
    short_descrition: string;
    content?: string;
    craeted_at: string;
    user: User;
}

type User = {
    id: number;
    name: string;
    email: string;
}