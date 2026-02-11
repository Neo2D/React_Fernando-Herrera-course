import { GifList } from "./gifs/components/GifList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { useGifs } from "./gifs/hooks/useGifs"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"

export const GifsApp = () => {

  const {gifs, previousTerms, handleSearch, handleTermClick} = useGifs()

  return (
    <>
        <CustomHeader title="Buscador de gifs" description="Descubre y comparte el gif perfecto" />

        <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />

        <PreviousSearches searches={previousTerms} onLabelClick={handleTermClick} />

        <GifList gifs={gifs}/>
    </>
  )
}
