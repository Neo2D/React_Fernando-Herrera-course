import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FavoriteHeroProvided } from "./context/FavoriteHeroContext"

const queryClient = new QueryClient()

export const HeroesApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvided>
        <RouterProvider router={appRouter} />

        <ReactQueryDevtools initialIsOpen={false} />
      </FavoriteHeroProvided>
    </QueryClientProvider>
  )
}
