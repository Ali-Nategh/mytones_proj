// Initializing PrismaClient
import { Genres, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function PrismaCreateSong(song_name: string, file_path: string, artist_id: string, duration: string
    , album_id?: string, publisher?: string, ISRC?: string, copyright_info?: string, release_date?: string
    , genres?: Genres, producers?: string[], writers?: string[], engineers?: string[]) {
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
    })
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

export async function PrismaFindSong(song_id: string) {
    const song = await prisma.song.findUnique({
        where: { id: song_id }
    });
    return song;
}

export async function PrismaFindAlbum(album_id: string) {
    const album = await prisma.album.findUnique({
        where: { id: album_id }
    });
    return album;
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

