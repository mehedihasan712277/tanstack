import { useParams } from "react-router-dom"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostDataType = {
    id: string;
    title: string;
    body: string;
};

const PostDetailsRQ = () => {
    const { id } = useParams()
    const { data, isLoading, error, isError } = useQuery<PostDataType>({
        queryKey: ["post", id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:4000/posts/${id}`);
            return response.data;
        },
    });

    if (isLoading) {
        return <p>loading......</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <p>{data?.title}</p>
            <p>{data?.body}</p>
        </div>
    );
}

export default PostDetailsRQ