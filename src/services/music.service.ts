import { Request, Response } from "express";
import { sendError } from "../errors/errorHandler";
import { httpStatusCodes } from "../errors/httpStatusCodes";
import { PrismaCreateSong, PrismaFindSongFilepath, PrismaFindSongISRC, PrismaFindSong, PrismaFindAlbum, PrismaCreateArtist } from "../repositories/music.repository";

export async function addMusicService(req: Request, res: Response) {
    const file_path = await PrismaFindSongFilepath(req.body.file_path);
    if (file_path) {
        return sendError(httpStatusCodes.BAD_REQUEST, "File Path Already Exists", res)
    }
    if (req.body.ISRC) {
        const isrc = await PrismaFindSongISRC(req.body.ISRC)
        if (isrc) return sendError(httpStatusCodes.BAD_REQUEST, "ISRC Code Already Exists", res)
    }

    const song = await PrismaCreateSong(req.body.song_name, req.body.file_path, req.body.artist_id, req.body.duration
        , req.body.album_id, req.body.publisher, req.body.ISRC, req.body.copyright_info
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
        const artist = await PrismaCreateArtist(req.body.artist_name, req.body.albums_id, req.body.songs_id);
        console.log(artist);
        return res.status(201).send("Artist Created Successfully");
    }
}
