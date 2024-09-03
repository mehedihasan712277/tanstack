import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";

type FruitDataType = {
    id: string;
    name: string;
};
const fetchFruits = (page: number) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=6&_page=${page}`)
}


const PaginatedQueries = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["fruits", page],
        queryFn: () => fetchFruits(page)
    })


    if (isLoading) {
        return <p>loading......</p>;
    }
    if (isError) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            {data?.data?.map((fruit: FruitDataType) => (
                <div className="bg-slate-200 p-4 m-4">
                    <p><span>{fruit.id}.</span> {fruit.name}</p>
                </div>
            ))}
            <button className="bg-slate-400 px-4 py-2 rounded" onClick={() => setPage(prev => prev - 1)} disabled={page === 1 ? true : false}>Prev</button>
            <span className="mx-4">{page}</span>
            <button className="bg-slate-400 px-4 py-2 rounded" onClick={() => setPage(prev => prev + 1)}>Next</button>
        </div>
    )
}

export default PaginatedQueries