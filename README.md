# TanStack Query — What I've Learned

A personal reference doc based on hands-on examples with `@tanstack/react-query`.

---

## Setup

TanStack Query requires a `QueryClient` and a `QueryClientProvider` wrapping the app so all components can access the query cache.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <YourApp />
        </QueryClientProvider>
    );
}
```

---

## 1. Queries — `useQuery`

Used for **fetching / reading data**.

```tsx
const { data, isLoading, error, refetch } = useQuery<Post[]>({
    queryKey: ["Posts"],
    queryFn: fetchPosts,
    enabled: loadData, // only run when this is true
});
```

### Key concepts

| Option / Return | What it does                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------- |
| `queryKey`      | Unique identifier for this query. Used for caching and invalidation.                          |
| `queryFn`       | Async function that fetches the data.                                                         |
| `enabled`       | Boolean that controls whether the query runs automatically. Useful for lazy/deferred loading. |
| `data`          | The resolved value from `queryFn`.                                                            |
| `isLoading`     | `true` on the first fetch when there's no cached data yet.                                    |
| `error`         | Set if `queryFn` throws.                                                                      |
| `refetch`       | Function to manually re-trigger the query.                                                    |

### Example pattern

```tsx
// Don't load until the user clicks a button
const [loadData, setLoadData] = useState(false);

const { data, isLoading } = useQuery({
  queryKey: ["Posts"],
  queryFn: fetchPosts,
  enabled: loadData,
});

<button onClick={() => setLoadData(true)}>Load Posts</button>
<button onClick={() => refetch()}>Refetch</button>
```

---

## 2. Mutations — `useMutation`

Used for **creating / updating / deleting data** (any write operation).

```tsx
const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: addPost,
});
```

### Key concepts

| Option / Return     | What it does                                                                        |
| ------------------- | ----------------------------------------------------------------------------------- |
| `mutationFn`        | Async function that performs the write. Receives the argument passed to `mutate()`. |
| `mutate(variables)` | Call this to trigger the mutation.                                                  |
| `isPending`         | `true` while the mutation is in flight.                                             |
| `isSuccess`         | `true` after a successful mutation.                                                 |
| `isError`           | `true` if the mutation threw.                                                       |
| `data`              | The resolved value returned by `mutationFn` on success.                             |
| `error`             | The error object if `mutationFn` threw.                                             |

### Example pattern

```tsx
const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: addPost,
});

const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ userId: 1, title, body });
};

<button type="submit" disabled={isPending}>
    {isPending ? "Creating..." : "Create Post"}
</button>;

{
    isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

> **Note:** Unlike `useQuery`, mutations don't run automatically — you call `mutate()` yourself.

---

## 3. Caching & Invalidation

TanStack Query caches query results by `queryKey`. Once data is fetched, it's served from cache on subsequent mounts without a network request — until the cache is stale or explicitly invalidated.

### `staleTime`

Controls how long cached data is considered fresh. During this window, no refetch happens even on remount.

```tsx
useQuery({
    queryKey: ["PostList"],
    queryFn: fetchPosts,
    staleTime: 1000 * 5, // data stays fresh for 5 seconds
});
```

### `isFetching` vs `isLoading`

| Flag         | When it's `true`                                                         |
| ------------ | ------------------------------------------------------------------------ |
| `isLoading`  | First load only — no data in cache yet.                                  |
| `isFetching` | Any time a network request is in flight, including background refetches. |

### Manual invalidation with `useQueryClient`

```tsx
const queryClient = useQueryClient();

// Mark cache as stale → triggers a refetch if the query is currently active
queryClient.invalidateQueries({ queryKey: ["PostList"] });
```

Calling `invalidateQueries` is how you tell TanStack Query that data has changed (e.g. after a successful mutation) and a fresh fetch should happen.

### Mount / unmount behaviour

When a component that uses `useQuery` is **unmounted and remounted**:

- If the data is still **fresh** (within `staleTime`), the cached data is returned immediately — no network request.
- If the data is **stale** (past `staleTime`), a background refetch is triggered automatically.

---

## Quick Reference

```
useQuery       → read data, automatic, cached
useMutation    → write data, manual, not cached
queryKey       → cache identity + invalidation target
staleTime      → how long before a refetch is triggered
invalidate     → force a query to be considered stale
enabled        → conditionally start/pause a query
isFetching     → any in-flight request (including background)
isLoading      → first-time fetch with no cache
```
