// Initializing PrismaClient
import { Genres, PrismaClient, Action } from '@prisma/client';
const prisma = new PrismaClient();

import { seperator } from '../utils/seperator';


// --------------------------------------------------SONGS------------------------------------------------------------- //

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
export async function PrismaUpdateSong(song_id: string, album_id?: string, publisher?: string, ISRC?: string
    , copyright_info?: string, release_date?: string, genres?: Genres[], producers?: string[]
    , writers?: string[], engineers?: string[]) {
    const song = await prisma.song.update({
        where: { id: song_id },
        data: {
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


// --------------------------------------------------ARTISTS------------------------------------------------------------- //

export async function PrismaCreateArtist(artist_name: string, albums_id?: string[], songs_id?: string[]) {
    const artist = await prisma.artist.create({
        data: {
            name: artist_name,
        },
    });
    return artist;
}
export async function PrismaUpdateArtist(artist_id: string, songs_id?: string[]) {
    let artist = []
    if (songs_id) for (let i = 0; i < songs_id.length; i++) {
        const song = await prisma.grouping.upsert({
            where: {
                song_id_group_type_group_id: { song_id: songs_id[i], group_type: 'ALBUM', group_id: artist_id },
            },
            update: {
                creator_id: artist_id,
            },
            create: {
                song_id: songs_id[i],
                creator_id: artist_id,
                group_id: artist_id,
                group_type: 'ALBUM',
            }
        });
        artist.push(song);
    }
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


// --------------------------------------------------ALBUMS------------------------------------------------------------- //

export async function PrismaCreateAlbum(album_name: string, artist_id: string, release_date: string
    , feat_artists_id: string[], genres?: Genres[]) {
    const album = await prisma.album.create({
        data: {
            name: album_name,
            artist_id: artist_id,
            release_date: release_date,
            feat_artists_id: feat_artists_id,
            genres: genres,
        },
    });
    return album;
}
export async function PrismaUpdateAlbum(album_id: string, songs_id?: string[], genres?: Genres[]) {
    if (genres) await prisma.album.update({ where: { id: album_id }, data: { genres: genres } });
    const old_album = await prisma.album.findUnique({ where: { id: album_id } });
    const albums = [];
    if (songs_id && old_album) for (let i = 0; i < songs_id.length; i++) {
        const album = await prisma.grouping.upsert({
            where: {
                song_id_group_type_group_id: { song_id: songs_id[i], group_type: 'ALBUM', group_id: album_id },
            },
            update: {
                creator_id: old_album.artist_id,
            },
            create: {
                song_id: songs_id[i],
                creator_id: old_album.artist_id,
                group_id: album_id,
                group_type: 'ALBUM',
            }
        });
        albums.push(album)
    }
    return albums
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
export async function PrismaAlbumSongsQuery(album_id: string) {
    const songs = await prisma.grouping.findMany({
        where: { AND: [{ group_id: album_id }, { group_type: 'ALBUM' }] }
    });
    return songs;
}


// --------------------------------------------------PLAYLISTS------------------------------------------------------------- //

export async function PrismaCreatePlaylist(playlist_name: string, user_id: string, songs_id?: string[]) {
    const playlist = await prisma.playlist.create({
        data: {
            name: playlist_name,
            user_id: user_id,
        },
    });
    if (songs_id) for (let i = 0; i < songs_id.length; i++) {
        const song = await prisma.grouping.upsert({
            where: {
                song_id_group_type_group_id: { song_id: songs_id[i], group_type: 'PLAYLIST', group_id: playlist.id },
            },
            update: {
                creator_id: user_id,
            },
            create: {
                creator_id: user_id,
                group_id: playlist.id,
                group_type: 'PLAYLIST',
                song_id: songs_id[i],
            }
        })
    }
    return playlist;
}
export async function PrismaUpdatePlaylist(playlist_id: string, user_id: string, playlist_name?: string, songs_id?: string[]) {
    const playlist = await prisma.playlist.update({
        where: {
            id: playlist_id,
            user_id: user_id,
        },
        data: {
            name: playlist_name,
        },
    });
    if (songs_id) for (let i = 0; i < songs_id.length; i++) {
        const song = await prisma.grouping.upsert({
            where: {
                song_id_group_type_group_id: { song_id: songs_id[i], group_type: 'PLAYLIST', group_id: playlist.id },
            },
            update: {
                creator_id: user_id,
            },
            create: {
                creator_id: user_id,
                group_id: playlist.id,
                group_type: 'PLAYLIST',
                song_id: songs_id[i],
            }
        })
    }
    return playlist;
}
export async function PrismaFindPlaylist(playlist_id: string) {
    const playlist = await prisma.playlist.findUnique({
        where: { id: playlist_id }
    });
    return playlist;
}
export async function PrismaPlaylistsQuery(user_id: string) {
    const playlists = await prisma.playlist.findMany({
        where: { user_id: { contains: user_id } }
    });
    return playlists;
}
export async function PrismaPlaylistSongsQuery(user_id: string, playlist_id: string) {
    const songs = await prisma.grouping.findFirst({
        where: {
            AND: [{ creator_id: user_id }, { group_type: 'PLAYLIST' }, { group_id: playlist_id }],
        }
    });
    return songs;
}


// -------------------------------------------------ACTIONS------------------------------------------------------------ //

export async function PrismaCreateOrDeleteAction(user_id: string, target_id: string, type: Action) {
    const prev_actions = await prisma.actions.findUnique({
        where: {
            user_id_target_id_action_type: { user_id: user_id, target_id: target_id, action_type: type }
        }
    })

    if (prev_actions) {
        await prisma.actions.delete({
            where: {
                user_id_target_id_action_type: { user_id: user_id, target_id: target_id, action_type: type }
            }
        });
        return false;
    }

    const actions = await prisma.actions.create({
        data: {
            user_id: user_id,
            target_id: target_id,
            action_type: type,
        }
    });
    return actions;
}

export async function PrismaActionsQuery(user_id: string, type: Action) {
    const actions = await prisma.actions.findMany({
        where: { AND: [{ user_id: user_id }, { action_type: type }] }
    });
    return actions;
}


// ------------------------------------------------GETALL----------------------------------------------------------- //

export async function PrismaGetAllMusic() {
    const songs = await prisma.song.findMany({});
    const albums = await prisma.album.findMany({});
    const artists = await prisma.artist.findMany({});
    const playlists = await prisma.playlist.findMany({});
    const favorites = await prisma.actions.findMany({}); // -------------------------
    const genres = await prisma.genre.findMany({});
    return [
        seperator("SONGS"), songs, seperator("ALBUMS"), albums, seperator("ARTISTS"), artists,
        seperator("PLAYLISTS"), playlists, seperator("ACTIONS"), favorites, seperator("GENRES"), genres,
        seperator("")
    ];
}
