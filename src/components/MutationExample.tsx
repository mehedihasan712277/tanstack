import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Post = {
    userId: number;
    title: string;
    body: string;
};

const addPost = async (newPost: Post) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    });

    return res.json();
};

const MutationExample = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
        mutationFn: addPost,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({
            userId: 1,
            title,
            body,
        });

        setTitle("");
        setBody("");
    };

    return (
        <div>
            <h2>Add Post</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="bg-slate-200 p-4 rounded"
                    />
                </div>

                <div>
                    <label>Body</label>
                    <br />
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="bg-slate-200 p-4 rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 py-2 bg-orange-500 rounded"
                >
                    {isPending ? "Creating..." : "Create Post"}
                </button>
            </form>

            {isError && <p>Error: {error.message}</p>}

            {isSuccess && (
                <div>
                    <h3>Post Created Successfully</h3>
                    <pre className="bg-slate-200 w-fit p-4">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default MutationExample;
