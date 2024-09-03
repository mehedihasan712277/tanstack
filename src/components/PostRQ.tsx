import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type PostDataType = {
    id: string;
    title: string;
    body: string;
};

const PostRQ = () => {
    //                                                  refetch
    const { data, isLoading, error, isError, isFetching } = useQuery<PostDataType[]>({
        queryKey: ["post"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:4000/posts");
            return response.data;
        },
        // staleTime: 10000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true
        // enabled: false
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
            {/*      {onClick = {() => refetch()}} */}
            <button className="bg-green-400 px-4 py-2 m-4">fetch</button>
            {data?.map((post) => (
                <Link key={post.id} to={`/rq/${post.id}`}>
                    <div className="bg-slate-200 p-4 m-4">
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default PostRQ;
