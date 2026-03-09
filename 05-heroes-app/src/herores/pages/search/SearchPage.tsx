import { CustomJumbotron } from "@/components/Custom/CustomJumbotron"
import { HeroStats } from "@/herores/components/HeroStats"
import { SearchControls } from "./ui/SearchControls"
import { CustomBreadcrumbs } from "@/components/Custom/CustomBreadcrumbs"
import { HeroGrid } from "@/herores/components/HeroGrid"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { searchHearoesAction } from "@/herores/actions/search-heroes.action"

export const SearchPage = () => {

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name') ?? undefined
  const strength = searchParams.get('strength') ?? undefined

  const {data: heroes = []} = useQuery({
    queryKey:['heroes', { name, strength }],
    queryFn: () => searchHearoesAction({name, strength}),
    staleTime: 1000 * 60 * 5
  })

  return (
    <>
      <CustomJumbotron 
          title="Busqueda de SuperHerores"
          description="Descubre, explora y administra super herores y villanos"
      />

      <CustomBreadcrumbs currentPage="Hero Search" breadcrumbs={
        [
          { label: 'Home', to: '/' },
          { label: 'Home2', to: '/' },
          { label: 'Home3', to: '/' }
        ]
      }/>

      <HeroStats />

      <SearchControls />

      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage
