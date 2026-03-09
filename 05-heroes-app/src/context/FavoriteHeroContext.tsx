import type { Hero } from "@/herores/types/hero.interface";
import { createContext, useEffect, useState, type PropsWithChildren } from "react";

interface FavoriteHeroContext {
    favorites: Hero[]
    favoriteCount: number

    isFavorite: (hero: Hero) => boolean
    toggleFavorite: (hero: Hero) => void
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext)

const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
}

export const FavoriteHeroProvided = ({children}: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage)

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id)

        if (heroExist) {
            setFavorites( favorites.filter(h => h.id !== hero.id))
            return
        }
        
        setFavorites([...favorites, hero])
    }

    const isFavorite = (hero: Hero) => {
        return favorites.some((h) => h.id === hero.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

  return (
    <FavoriteHeroContext
        value={{
            favoriteCount: favorites.length,
            favorites: favorites,
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite
        }}
    >
        {children}
    </FavoriteHeroContext>
  )
}
