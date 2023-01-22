import {
    addMusicService, addArtistService, addAlbumService, addPlaylistService,
    queryAlbumService, queryArtistService, queryMusicService, queryPlaylistService, queryActionsService,
    updateMusicService, updateArtistService, updateAlbumService, updatePlaylistService, createOrDeleteActionsService
} from "../services/music.service";
import { logError, sendError, sendOperationalError } from "../errors/errorHandler";
import { httpStatus } from "../errors/httpStatusCodes";
import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/baseError";


// --------------------------------------------------SONGS------------------------------------------------------------- //

export async function addMusic(req: Request, res: Response) {
    try {
        await addMusicService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "FILE_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ISRC_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "PATH_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ARTIST_ID_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function updateMusic(req: Request, res: Response) {
    try {
        await updateMusicService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ISRC_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function queryMusic(req: Request, res: Response) {
    try {
        await queryMusicService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_NAME_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};


// --------------------------------------------------ARTISTS------------------------------------------------------------- //

export async function addArtist(req: Request, res: Response) {
    try {
        await addArtistService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "UNKNOWN_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function updateArtist(req: Request, res: Response) {
    try {
        await updateArtistService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ARTIST_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "UNKNOWN_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function queryArtist(req: Request, res: Response) {
    try {
        await queryArtistService(req, res)
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ARTIST_NAME_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};


// --------------------------------------------------ALBUMS------------------------------------------------------------- //

export async function addAlbum(req: Request, res: Response) {
    try {
        await addAlbumService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ARTIST_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "GENRE_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "UNKNOWN_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function updateAlbum(req: Request, res: Response) {
    try {
        await updateAlbumService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "GENRE_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "UNKNOWN_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function queryAlbum(req: Request, res: Response) {
    try {
        await queryAlbumService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ALBUM_ID_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};


// --------------------------------------------------PLAYLISTS------------------------------------------------------------- //

export async function addPlaylist(req: Request, res: Response) {
    try {
        await addPlaylistService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "USER_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "UNKNOWN_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function updatePlaylist(req: Request, res: Response) {
    try {
        await updatePlaylistService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "PLAYLIST_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "USER_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "SONG_ID_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};
export async function queryPlaylist(req: Request, res: Response) {
    try {
        await queryPlaylistService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "PLAYLIST_NAME_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
};


// -------------------------------------------------ACTIONS------------------------------------------------------------ //

export async function updateActions(req: Request, res: Response) {
    try {
        await createOrDeleteActionsService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "USER_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "TARGET_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ACTION_UPDATE_ERROR") {
            logError(error)
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
}
export async function queryActions(req: Request, res: Response) {
    queryActions
    try {
        await queryActionsService(req, res);
    } catch (error: BaseError | any) {
        if (error.name === "VALIDATION_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "USER_ID_ERROR") {
            return sendOperationalError(error, res)
        } else if (error.name === "ACTION_QUERY_ERROR") {
            return sendOperationalError(error, res)
        } else {
            logError(error)
            return sendError(httpStatus.INTERNAL_SERVER_ERROR, error, res)
        }
    }
}
