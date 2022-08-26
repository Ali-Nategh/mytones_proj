// Initializing PrismaClient
import { Genres, PrismaClient, Type } from '@prisma/client';
const prisma = new PrismaClient();


export async function PrismaCreateSong(song_name: string, file_path: string, artist_id: string, duration: string
    , album_id?: string, publisher?: string, ISRC?: string, copyright_info?: string, release_date?: string
    , genres?: Genres[], producers?: string[], writers?: string[], engineers?: string[]) {
    const song = await prisma.song.create({
        data: {
            song_name: song_name,
            file_path: file_path,
            artist_id: artist_id,
            duration: duration,
            album_id: album_id,
            publisher: publisher,
            ISRC: ISRC,
            copyright_info: copyright_info,
            release_date: release_date,
            genres: genres,
            producers: producers,
            writers: writers,
            engineers: engineers,
        }
    });
    return song;
}
export async function PrismaFindSong(song_id: string) {
    const song = await prisma.song.findUnique({
        where: { id: song_id }
    });
    return song;
}
export async function PrismaFindSongFilepath(filePath: string) {
    const file = await prisma.song.findUnique({
        where: { file_path: filePath }
    });
    return file;
}
export async function PrismaFindSongISRC(ISRC: string) {
    const isrc = await prisma.song.findUnique({
        where: { ISRC: ISRC }
    });
    return isrc;
}
export async function PrismaSongsQuery(song_name: string) {
    const songs = await prisma.song.findMany({
        where: { song_name: { contains: song_name } }
    });
    return songs;
}


export async function PrismaCreateArtist(artist_name: string, albums_id?: string[], songs_id?: string[]) {
    const artist = await prisma.artist.create({
        data: {
            name: artist_name,
            albums_id: albums_id,
            songs_id: songs_id,
        },
    });
    return artist;
}
export async function PrismaFindArtist(artist_id: string) {
    const artist = await prisma.artist.findUnique({
        where: { id: artist_id }
    });
    return artist;
}
export async function PrismaArtistsQuery(artist_name: string) {
    const artists = await prisma.artist.findMany({
        where: { name: { contains: artist_name } }
    });
    return artists;
}


export async function PrismaCreateAlbum(album_name: string, artist_id: string, release_date: string
    , songs_id?: string[], genres?: Genres[]) {
    const album = await prisma.album.create({
        data: {
            name: album_name,
            artist_id: artist_id,
            release_date: release_date,
            songs_id: songs_id,
            genres: genres,
        },
    });
    return album;
}
export async function PrismaFindAlbum(album_id: string) {
    const album = await prisma.album.findUnique({
        where: { id: album_id }
    });
    return album;
}
export async function PrismaAlbumsQuery(album_name: string) {
    const albums = await prisma.album.findMany({
        where: { name: { contains: album_name } }
    });
    return albums;
}


export async function PrismaCreatePlaylist(playlist_name: string, user_id: string, songs_id?: string[]) {
    const playlist = await prisma.playlist.create({
        data: {
            name: playlist_name,
            user_id: user_id,
            songs_id: songs_id
        },
    });
    return playlist;
}
export async function PrismaPlaylistsQuery(user_id: string) {
    const playlists = await prisma.playlist.findMany({
        where: { user_id: { contains: user_id } }
    });
    return playlists;
}


export async function PrismaCreateUserFavorites(user_id: string) {
    const favoriteSongs = await prisma.favorites.create({
        data: {
            user_id: user_id,
            type: "SONGS"
        }
    });
    const favoriteArtists = await prisma.favorites.create({
        data: {
            user_id: user_id,
            type: "ARTISTS"
        }
    });
    const favoriteAlbums = await prisma.favorites.create({
        data: {
            user_id: user_id,
            type: "ALBUMS"
        }
    });
    const downloads = await prisma.favorites.create({
        data: {
            user_id: user_id,
            type: "DOWNLOADS"
        }
    });
    return [favoriteSongs, favoriteArtists, favoriteAlbums, downloads]
}
export async function PrismaFavoritesQuery(user_id: string, type: Type) {
    const favorites = await prisma.favorites.findMany({
        where: { AND: [{ user_id: user_id }, { type: type }] }
    });
    return favorites;
}


export async function PrismaGetAllMusic() {
    const songs = await prisma.song.findMany({});
    const albums = await prisma.album.findMany({});
    const artists = await prisma.artist.findMany({});
    const playlists = await prisma.playlist.findMany({});
    const favorites = await prisma.favorites.findMany({});
    return [songs, albums, artists, playlists, favorites];
}
