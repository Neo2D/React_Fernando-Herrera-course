import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/Custom/CustomJumbotron"
import { HeroStats } from "@/herores/components/HeroStats"
import { HeroGrid } from "@/herores/components/HeroGrid"
import { CustomPagination } from "@/components/Custom/CustomPagination"
import { CustomBreadcrumbs } from "@/components/Custom/CustomBreadcrumbs"
import { useSearchParams } from "react-router"
import { use, useMemo } from "react"
import { useHeroSummary } from "@/herores/hooks/useHeroSummary"
import { usePaginatedHero } from "@/herores/hooks/usePaginatedHero"
import { FavoriteHeroContext } from "@/context/FavoriteHeroContext"

export const HomePage = () => {

  const [ searchParams, setSearchParams ] = useSearchParams()
  const {favoriteCount, favorites} = use(FavoriteHeroContext)

  const activeTab = searchParams.get('tab') ?? 'all'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '6'
  const category = searchParams.get('category') ?? 'aa'

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)
  const {data: summary} = useHeroSummary()

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron 
          title="Universo de SuperHerores"
          description="Descubre, explora y administra super herores y villanos"
        />
        
        <CustomBreadcrumbs currentPage="Super Heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={ () => setSearchParams((prev) => {
              prev.set('tab', 'all')
              prev.set('category', 'all')
              prev.set('page', '1')
              return prev
            }) }>All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" onClick={ () => setSearchParams((prev) => {
              prev.set('tab', 'favorites')
              return prev
            }) } className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={ () => setSearchParams((prev) => {
              prev.set('tab', 'heroes')
              prev.set('category', 'hero')
              prev.set('page', '1')
              return prev
            }) }>Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={ () => setSearchParams((prev) => {
              prev.set('tab', 'villains')
              prev.set('category', 'villain')
              prev.set('page', '1')
              return prev
            }) }>Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <h1>Todos los personajes</h1>
            {/* Character Grid */}
            <HeroGrid heroes={ heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <HeroGrid heroes={favorites} />

          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={ heroesResponse?.heroes ?? []} />

          </TabsContent>
          <TabsContent value="villains">
            <h1>Villanos</h1>
            <HeroGrid heroes={ heroesResponse?.heroes ?? []} />

          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {
          selectedTab !== 'favorites' && (
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          )
        }
      </>
    </>
  )
}