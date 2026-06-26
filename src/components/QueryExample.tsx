import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    return res.json();
};

const QueryExample = () => {
    const [loadData, setLoadData] = useState(false);
    const { data, isLoading, error, refetch } = useQuery<Post[]>({
        queryKey: ["Posts"],
        queryFn: fetchPosts,
        enabled: loadData,
    });

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            <div className="flex flex-col items-center gap-2 mb-10">
                <p>All Posts</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setLoadData(true)}
                        className="px-4 py-2 bg-orange-500 cursor-pointer rounded border-0"
                    >
                        Load Post
                    </button>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-orange-500 cursor-pointer rounded border-0"
                    >
                        Refetch
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="text-center py-100 px-20 bg-slate-200">
                    Data is loading
                </div>
            ) : (
                <div className="flex flex-col gap-4 items-center">
                    {data?.map((ele) => (
                        <div
                            key={ele.id}
                            className="flex flex-col gap-3 p-4 rounded max-w-3xl bg-slate-200"
                        >
                            <p>{ele.id}</p>
                            <p>{ele.title}</p>
                            <p>{ele.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QueryExample;
