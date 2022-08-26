import {
    PrismaCreateSong, PrismaFindSongFilepath, PrismaFindSongISRC, PrismaFindSong, PrismaCreatePlaylist,
    PrismaFindAlbum, PrismaCreateArtist, PrismaCreateAlbum, PrismaFindArtist,
} from "../repositories/music.repository";
import { PrismaFindUser } from "../repositories/user.repository";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { sendError } from "../errors/errorHandler";
import { Request, Response } from "express";
import { Genres } from "@prisma/client";


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

    const song = await PrismaCreateSong(req.body.song_name, req.body.file_path, req.body.artist_id, req.body.duration
        , req.body.album_id, req.body.publisher, ISRC, req.body.copyright_info
        , req.body.release_date, req.body.genres, req.body.producers, req.body.writers, req.body.engineers)
    console.log(song);

    return res.status(201).send("Song Created Successfully");
}


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
        const artist = await PrismaCreateArtist(req.body.artist_name, req.body.albums_id, songs);
        console.log(artist);
        return res.status(201).send("Artist Created Successfully");
    }
}


export async function addAlbumService(req: Request, res: Response) {
    let noErrors = true;
    const artistid = req.body.artist_id
    const songs = req.body.songs_id;
    const genres = req.body.genres;

    const artist = await PrismaFindArtist(artistid)
    if (!artist) return sendError(httpStatusCodes.NOT_FOUND, `Artist ID (${artistid}) Not Found`, res)
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
        const album = await PrismaCreateAlbum(req.body.album_name, req.body.artist_id, req.body.release_date, songs, genres)
        console.log(album);
        return res.status(201).send("Album Created Successfully");
    }
}


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
