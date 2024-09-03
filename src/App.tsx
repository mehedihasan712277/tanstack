import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from './components/Error'
import HomePage from './components/home'
import PostTraditional from './components/PostTraditional'
import PostRQ from './components/PostRQ'
import Maincontainer from './components/Maincontainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetailsRQ from './components/PostDetailsRQ'
import PaginatedQueries from './components/PaginatedQueries'
import InfiniteQueries from './components/InfiniteQueries'


const allRoute = createBrowserRouter([
  {
    path: "/",
    element: <Maincontainer></Maincontainer>,
    errorElement: <Error></Error>,//This component must be imported
    children: [

      {
        path: "/",
        element: <HomePage></HomePage>
      },
      {
        path: "/traditional",
        element: <PostTraditional></PostTraditional>
      },
      {
        path: "/rq",
        element: <PostRQ></PostRQ>
      },
      {
        path: "/rq/:id",
        element: <PostDetailsRQ></PostDetailsRQ>
      },
      {
        path: "/fruits",
        element: <PaginatedQueries></PaginatedQueries>
      },
      {
        path: "/infiniteQueries",
        element: <InfiniteQueries></InfiniteQueries>
      }
    ]
  }
])

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={allRoute}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App