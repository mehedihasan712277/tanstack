import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type PostDataType = {
    id: string;
    title: string;
    body: string;
};

const PostRQ = () => {
    const { data, isLoading, error, isError, isFetching, refetch } = useQuery<PostDataType[]>({
        queryKey: ["post"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:4000/posts");
            return response.data;
        },
        // staleTime: 10000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true
        enabled: false
    });
    console.log(isLoading, isFetching);

    if (isLoading) {
        return <p>loading......</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <button onClick={() => refetch()} className="bg-green-400 px-4 py-2 m-4">fetch</button>
            {data?.map((post) => (
                <div key={post.id} className="bg-slate-200 p-4 m-4">
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};

export default PostRQ;
