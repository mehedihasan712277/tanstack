import axios from "axios";
import { useEffect, useState } from "react"

type postDatatype = {
    id: string;
    title: string;
    body: string;
}

const PostTraditional = () => {
    const [posts, setPosts] = useState<postDatatype[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:4000/posts");
            setPosts(response.data);
        } catch (error) {
            setError(true);
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [])

    if (loading) {
        return <p>loading......</p>
    }

    if (error) {
        return <p>error</p>
    }
    return (
        <div>
            {
                posts.map(ele => {
                    return <div key={ele.id} className="p-4 m-4 bg-slate-400">
                        <p>{ele.title}</p>
                        <p>{ele.body}</p>
                    </div>
                })
            }
        </div>
    )
}

export default PostTraditional