import {
    PrismaCreateSong, PrismaFindSong, PrismaSongsQuery, PrismaUpdateSong, PrismaFindSongFilepath, PrismaFindSongISRC,
    PrismaCreateArtist, PrismaFindArtist, PrismaArtistsQuery, PrismaUpdateArtist,
    PrismaFindAlbum, PrismaCreateAlbum, PrismaAlbumsQuery, PrismaUpdateAlbum, PrismaAlbumSongsQuery,
    PrismaCreatePlaylist, PrismaPlaylistsQuery, PrismaUpdatePlaylist, PrismaFindPlaylist, PrismaPlaylistSongsQuery,
    PrismaCreateOrDeleteAction, PrismaActionsQuery,
} from "../repositories/music.repository";
import { PrismaFindUser } from "../repositories/user.repository";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { sendError } from "../errors/errorHandler";
import { Request, Response } from "express";
import { Action, Genres } from "@prisma/client";
import { toJson } from "../utils/toJson";
import console from "console";


// --------------------------------------------------SONGS------------------------------------------------------------- //

export async function addMusicService(req: Request, res: Response) {
    const file_path = await PrismaFindSongFilepath(req.body.file_path);
    if (file_path) {
        return sendError(httpStatusCodes.BAD_REQUEST, "File Path Already Exists", res)
    }
    const ISRC = req.body.ISRC
    if (ISRC) {
        const isrc = await PrismaFindSongISRC(ISRC)
        if (isrc) return sendError(httpStatusCodes.BAD_REQUEST, "ISRC Code Already Exists", res)
    }

    const artist_id = req.body.artist_id;
    const artistExists = await PrismaFindArtist(artist_id)
    if (!artistExists) return sendError(httpStatusCodes.NOT_FOUND, `Artist ID (${artist_id}) Not Found`, res)

    const album_id = req.body.album_id;
    if (album_id) {
        const albumExists = await PrismaFindAlbum(album_id)
        if (!albumExists) return sendError(httpStatusCodes.NOT_FOUND, `Album ID (${album_id}) Not Found`, res)
    }

    const song = await PrismaCreateSong(req.body.song_name, req.body.file_path, artist_id, req.body.duration
        , album_id, req.body.publisher, ISRC, req.body.copyright_info, req.body.release_date
        , req.body.genres, req.body.producers, req.body.writers, req.body.engineers)
    console.log(song);

    return res.status(201).send("Song Created Successfully");
}

export async function updateMusicService(req: Request, res: Response) {
    const song_id = req.body.song_id
    if (!song_id) return sendError(httpStatusCodes.BAD_REQUEST, 'Song ID is required', res)
    const songExists = await PrismaFindSong(song_id)
    if (!songExists) return sendError(httpStatusCodes.NOT_FOUND, "Song ID not found", res)

    const ISRC = req.body.ISRC
    if (ISRC) {
        const isrc = await PrismaFindSongISRC(ISRC)
        if (isrc) return sendError(httpStatusCodes.BAD_REQUEST, "ISRC Code Already Exists", res)
    }

    const album_id = req.body.songs_id;
    if (album_id) {
        const albumExists = await PrismaFindAlbum(album_id)
        if (!albumExists) return sendError(httpStatusCodes.NOT_FOUND, `Album ID (${album_id}) Not Found`, res)
    }

    const updated_song = await PrismaUpdateSong(song_id, album_id, req.body.publisher, ISRC, req.body.copyright_info,
        req.body.release_date, req.body.genres, req.body.producers, req.body.writers, req.body.engineers)
    return res.status(200).send(toJson(updated_song))  // for big int
}

export async function queryMusicService(req: Request, res: Response) {
    const songs = await PrismaSongsQuery(`${req.query.songName}`)
    if (songs.length == 0) return sendError(httpStatusCodes.NOT_FOUND, "No Matching Songs Found", res)
    return res.status(200).send(toJson(songs))  // for big int
}

// --------------------------------------------------ARTISTS------------------------------------------------------------- //

export async function addArtistService(req: Request, res: Response) {
    let noErrors = true;
    const albums = req.body.albums_id;
    const songs = req.body.songs_id;

    if (albums) {
        for (let i = 0; i < albums.length; i++) {
            const album = await PrismaFindAlbum(albums[i])
            if (!album) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Album ID (${albums[i]}) Not Found`, res)
            }
        }
    }
    if (songs && noErrors) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${songs[i]}) Not Found`, res)
            }
        }
    }
    if (noErrors) {
        const artist = await PrismaCreateArtist(req.body.artist_name, albums, songs);
        console.log(artist);
        return res.status(200).send("Artist Created Successfully");
    }
}

export async function updateArtistService(req: Request, res: Response) {
    const artist_id = req.body.artist_id;
    if (!artist_id) return sendError(httpStatusCodes.BAD_REQUEST, 'Artist ID is required', res)
    const artistExists = await PrismaFindArtist(artist_id)
    if (!artistExists) return sendError(httpStatusCodes.NOT_FOUND, 'Artist ID Not Found', res)

    let noErrors = true;
    const albums = req.body.albums_id;
    const songs = req.body.songs_id;

    if (albums) {
        for (let i = 0; i < albums.length; i++) {
            const album = await PrismaFindAlbum(albums[i])
            if (!album) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Album ID (${albums[i]}) Not Found`, res)
            }
        }
    }
    if (songs && noErrors) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${songs[i]}) Not Found`, res)
            }
        }
    }
    if (noErrors) {
        const artist = await PrismaUpdateArtist(artist_id, songs);
        console.log(artist);
        return res.status(200).send("Artist Updated Successfully");
    }
}

export async function queryArtistService(req: Request, res: Response) {
    const artists = await PrismaArtistsQuery(`${req.query.artistName}`)
    if (artists.length == 0) return sendError(httpStatusCodes.NOT_FOUND, "No Matching Artists Found", res)
    return res.status(200).send(toJson(artists))
}

// --------------------------------------------------ALBUMS------------------------------------------------------------- //

export async function addAlbumService(req: Request, res: Response) {
    let noErrors = true;
    const artist_id = req.body.artist_id
    const feat_artists = req.body.feat_artist_id;
    const genres = req.body.genres;

    const artist = await PrismaFindArtist(artist_id)
    if (!artist) return sendError(httpStatusCodes.NOT_FOUND, `Artist ID (${artist_id}) Not Found`, res)
    if (feat_artists) {
        for (let i = 0; i < feat_artists.length; i++) {
            const artist = await PrismaFindArtist(feat_artists[i])
            if (!artist) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${feat_artists[i]}) Not Found`, res)
            }
        }
    }
    if (genres && noErrors) {
        for (let i = 0; i < genres.length; i++) {
            if (!(genres[i] in Genres)) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Genre (${genres[i]}) Not Found`, res)
            }
        }
    }
    if (noErrors) {
        const album = await PrismaCreateAlbum(req.body.album_name, artist_id, req.body.release_date, feat_artists, genres)
        console.log(album);
        return res.status(201).send("Album Created Successfully");
    }
}

export async function updateAlbumService(req: Request, res: Response) {
    const album_id = req.body.album_id
    if (!album_id) return sendError(httpStatusCodes.BAD_REQUEST, 'Album ID is required', res)
    const albumExists = await PrismaFindAlbum(album_id)
    if (!albumExists) return sendError(httpStatusCodes.NOT_FOUND, 'Artist ID Not Found', res)

    let noErrors = true;
    const songs = req.body.songs_id;
    const genres = req.body.genres;

    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${songs[i]}) Not Found`, res)
            }
        }
    }
    if (genres && noErrors) {
        for (let i = 0; i < genres.length; i++) {
            if (!(genres[i] in Genres)) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Genre (${genres[i]}) Not Found`, res)
            }
        }
    }
    if (noErrors) {
        const album = await PrismaUpdateAlbum(album_id, songs, genres)
        console.log(album);
        return res.status(200).send("Album Updated Successfully");
    }
}

export async function queryAlbumService(req: Request, res: Response) {
    const albums = await PrismaAlbumsQuery(`${req.query.albumName}`)
    if (albums.length == 0) return sendError(httpStatusCodes.NOT_FOUND, "No Matching Albums Found", res)
    return res.status(200).send(toJson(albums))
}

// --------------------------------------------------PLAYLISTS------------------------------------------------------------- //

export async function addPlaylistService(req: Request, res: Response) {
    const user_id = req.body.user_id
    const user = await PrismaFindUser(user_id)
    if (!user) return sendError(httpStatusCodes.NOT_FOUND, `User (${user_id}) Not Found`, res)

    let noErrors = true;
    const songs = req.body.songs_id;
    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${songs[i]}) Not Found`, res)
            }
        }
    }

    if (noErrors) {
        const playlist = await PrismaCreatePlaylist(req.body.playlist_name, user_id, songs)
        console.log(playlist)
    }

    return res.status(201).send("Playlist Created Successfully");
}

export async function updatePlaylistService(req: Request, res: Response) {
    const playlist_id = req.body.playlist_id;
    if (!playlist_id) return sendError(httpStatusCodes.BAD_REQUEST, 'Playlist ID is required', res)
    const playlistExists = await PrismaFindPlaylist(playlist_id)
    if (!playlistExists) return sendError(httpStatusCodes.NOT_FOUND, 'Playlist ID Not Found', res)

    const user_id = req.body.playlist_id;
    if (!user_id) return sendError(httpStatusCodes.BAD_REQUEST, 'User ID is required', res)
    const userExists = await PrismaFindUser(playlist_id)
    if (!userExists) return sendError(httpStatusCodes.NOT_FOUND, 'User ID Not Found', res)

    const songs = req.body.songs_id;
    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) return sendError(httpStatusCodes.NOT_FOUND, `Song ID (${songs[i]}) Not Found`, res)
        }
    }

    const playlist_update = await PrismaUpdatePlaylist(playlist_id, user_id, req.body.playlist_name, songs)
    console.log(playlist_update)
    return res.status(200).send("Playlist updated Successfully");
}

export async function queryPlaylistService(req: Request, res: Response) {
    const playlists = await PrismaPlaylistsQuery(req.params.user_id)
    if (playlists.length == 0) return sendError(httpStatusCodes.NOT_FOUND, "No Matching Playlists Found", res)
    return res.status(200).send(playlists)
}

// -------------------------------------------------ACTIONS------------------------------------------------------------ //

export async function createOrDeleteActionsService(req: Request, res: Response) {
    const user_id = req.body.user_id;
    if (!user_id) return sendError(httpStatusCodes.BAD_REQUEST, 'User ID is required', res);
    const userExists = await PrismaFindUser(user_id);
    if (!userExists) return sendError(httpStatusCodes.NOT_FOUND, 'User ID Not Found', res);

    const action_type = req.body.action_type;
    if (!action_type) return sendError(httpStatusCodes.BAD_REQUEST, 'Action is required', res);
    if (!(action_type in Action)) return sendError(httpStatusCodes.BAD_REQUEST, 'Action not Valid', res);

    const target_id = req.body.target_id;
    if (!target_id) return sendError(httpStatusCodes.BAD_REQUEST, 'Target ID is required', res);

    const song = PrismaFindSong(target_id);
    const artist = PrismaFindArtist(target_id);
    const album = PrismaFindAlbum(target_id);
    if (!song || !album || !artist) return sendError(httpStatusCodes.NOT_FOUND, 'Target Not Found', res);


    const actions_update = await PrismaCreateOrDeleteAction(user_id, target_id, action_type)

    if (actions_update === null) return sendError(httpStatusCodes.INTERNAL_SERVER_ERROR, 'Something went wrong', res)

    console.log(actions_update)
    if (!actions_update) return res.status(200).send("Actions Deleted Successfully");
    return res.status(200).send("Action Created Successfully");
}

export async function queryActionsService(req: Request, res: Response) {
    const favorites = await PrismaActionsQuery(`${req.query.userId}`, req.query.type as Action)
    if (favorites.length == 0) return sendError(httpStatusCodes.NOT_FOUND, "No Matching Actions Found", res)
    return res.status(200).send(favorites)
}
