import { useQuery, useQueryClient } from "@tanstack/react-query";
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

const PostList = () => {
    const {
        data: PostData,
        isLoading,
        isFetching,
    } = useQuery<Post[]>({
        queryKey: ["PostList"],
        queryFn: fetchPosts,
        staleTime: 1000 * 5,
    });

    if (isLoading) {
        return [1, 2, 3, 4, 5].map(() => (
            <div className="py-4 rounded bg-slate-300 animate-pulse my-2 text-center">
                Loading...
            </div>
        ));
    }

    if (isFetching) {
        return [1, 2, 3, 4, 5].map(() => (
            <div className="py-4 rounded bg-slate-300 animate-pulse my-2 text-center">
                Refetching...
            </div>
        ));
    }

    return (
        <div className="space-y-1">
            {PostData?.map((ele) => (
                <div
                    key={ele.id}
                    className="flex items-center gap-2 p-4 bg-slate-200 rounded"
                >
                    <p>{ele.id}</p>
                    <p>{ele.title}</p>
                </div>
            ))}
        </div>
    );
};

const CachingExample = () => {
    const [show, setShow] = useState(false);
    const queryClient = useQueryClient();

    const InvalidatePosts = () => {
        queryClient.invalidateQueries({
            queryKey: ["PostList"],
        });
    };

    return (
        <div className="space-y-2">
            <div className="space-x-2">
                <button
                    onClick={InvalidatePosts}
                    className="px-4 py-2 bg-orange-500 rounded cursor-pointer"
                >
                    Invalidate
                </button>
                <button
                    onClick={() => setShow(!show)}
                    className="px-4 py-2 bg-orange-500 rounded cursor-pointer"
                >
                    {show ? "Unmount" : "Mount"}
                </button>
            </div>

            {show && <PostList></PostList>}
        </div>
    );
};

export default CachingExample;
