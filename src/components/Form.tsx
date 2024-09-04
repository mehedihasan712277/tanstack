import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"

type PostDataType = {
    id: string;
    title: string;
    body: string;
};
//GET METHOD
const fetchData = () => {
    return axios.get(`http://localhost:4000/posts`)
}

//POST MERTHOD
const postData = (post: { title: string; body: string }) => {
    return axios.post(`http://localhost:4000/posts`, post)
}

const Form = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const queryClient = useQueryClient()

    const { data, isError, error, isLoading, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchData
    })

    const { mutate: addMutate } = useMutation({
        mutationFn: postData,
        // onSuccess: (newData) => {
        //     // method 1
        //     // queryClient.invalidateQueries({ queryKey: ["posts"] })

        //     // method 2
        // queryClient.setQueryData(["posts"], (oldQueryData: any) => {
        //     return {
        //         ...oldQueryData,
        //         data: [...oldQueryData.data, newData.data]
        //     }
        // })

        // }

        //method 3
        onMutate: async (newPost) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] })
            const previousPostData = queryClient.getQueryData(["posts"])

            queryClient.setQueryData(["posts"], (oldQueryData: any) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { ...newPost, id: String(oldQueryData?.data?.length + 1) }]
                }
            })

            return {
                previousPostData
            }
        },
        onError: (_error, _post, contex) => {
            queryClient.setQueryData(["posts"], contex?.previousPostData)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })

    if (isLoading) {
        return <p>loading......</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const post = { title, body };
        addMutate(post)
        setBody("");
        setTitle("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-slate-300 p-4 m-4 w-96">
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                <button type="submit" className="btn btn-outline">Submit</button>
            </form>

            <div>
                {
                    data?.data.map((ele: PostDataType) => {
                        return <div key={ele.id} className="p-4 m-4 bg-slate-200">
                            <p>{ele.title}</p>
                            <p>{ele.body}</p>
                        </div>
                    })
                }
            </div>

            <button className="btn btn-outline" onClick={() => refetch()}>Refresh</button>
        </div>
    )
}

export default Form