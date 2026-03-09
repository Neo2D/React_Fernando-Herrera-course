import type { Hero } from "./hero.interface";

export interface HeoresResponse {
    total:  number;
    pages:  number;
    heroes: Hero[];
}

