import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { useEffect } from "react";

type FruitDataType = {
    id: string;
    name: string;
};

const fetchFruits = ({ pageParam }: QueryFunctionContext): Promise<{ data: FruitDataType[] }> => {
    return axios.get(`http://localhost:4000/fruits/?_limit=10&_page=${pageParam}`);
};

const LoadOnScroll = () => {
    const { ref, inView } = useInView()
    const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["fruit"],
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

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView])

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
            <div ref={ref} className="text-center p-4">{isFetchingNextPage && "Loading...."}</div>
        </div>
    );
};

export default LoadOnScroll;
