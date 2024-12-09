type EpisodeType = {
    id: string
    number: number
    url: string
}

export type animeDataType = {
    id: string
    title: string
    url: string
    genres: string[]
    totalEpisodes: number
    image: string
    releaseDate: string
    description: string
    type: string
    status: string
    otherName: string
    subOrDub: string
    episodes: EpisodeType[]
}

export type episodeDataType = {
    name: string
    url: string
}[]