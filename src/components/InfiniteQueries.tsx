import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

type FruitDataType = {
    id: string;
    name: string;
};

const fetchFruits = ({ pageParam }: QueryFunctionContext): Promise<{ data: FruitDataType[] }> => {
    return axios.get(`http://localhost:4000/fruits/?_limit=11&_page=${pageParam}`);
};

const InfiniteQueries = () => {
    const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["fruits"],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < 4) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        }
    });

    if (isLoading) {
        return <p>loading......</p>;
    }
    if (isError) {
        return <p>{(error as Error).message}</p>;
    }

    return (
        <div>
            {data?.pages.map((ele, index) => (
                <div key={index}>
                    {ele.data.map((fruit: FruitDataType) => (
                        <div className="bg-slate-200 p-4 m-4" key={fruit.id}>
                            <p><span>{fruit.id}.</span> {fruit.name}</p>
                        </div>
                    ))}
                </div>
            ))}
            <button className="m-4 btn btn-outline" disabled={!hasNextPage} onClick={() => fetchNextPage()}>Load more..</button>
        </div>
    );
};

export default InfiniteQueries;
