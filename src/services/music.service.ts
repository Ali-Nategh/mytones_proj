import {
    PrismaCreateSong, PrismaFindSong, PrismaSongsQuery, PrismaUpdateSong, PrismaFindSongFilepath, PrismaFindSongISRC,
    PrismaCreateArtist, PrismaFindArtist, PrismaArtistsQuery, PrismaUpdateArtist,
    PrismaFindAlbum, PrismaCreateAlbum, PrismaAlbumsQuery, PrismaUpdateAlbum, PrismaAlbumSongsQuery,
    PrismaCreatePlaylist, PrismaPlaylistsQuery, PrismaUpdatePlaylist, PrismaFindPlaylist, PrismaPlaylistSongsQuery,
    PrismaCreateOrDeleteAction, PrismaActionsQuery,
} from "../repositories/music.repository";
import { PrismaFindUser } from "../repositories/user.repository";
import { Action, Genres } from "@prisma/client";
import Api400Error from "../errors/api400Error";
import Api404Error from "../errors/api404Error";
import Api500Error from "../errors/api500Error";
import { Request, Response } from "express";
import { toJson } from "../utils/toJson";
import console from "console";


// --------------------------------------------------SONGS------------------------------------------------------------- //

export async function addMusicService(req: Request, res: Response) {
    const song_name = req.body.song_name
    if (!song_name) throw new Api400Error(`Song Name Is Required`, "VALIDATION_ERROR")
    const duration = req.body.duration
    if (!duration) throw new Api400Error(`Duration Is Required`, "VALIDATION_ERROR")
    const artist_id = req.body.artist_id;
    if (!artist_id) throw new Api400Error(`Artist ID Is Required`, "VALIDATION_ERROR")
    const file_path = req.body.file_path
    if (!file_path) throw new Api400Error(`File Path Is Required`, "VALIDATION_ERROR")

    const pathExists = await PrismaFindSongFilepath(file_path);
    if (pathExists) throw new Api400Error("File Path Already Exists", "PATH_ERROR")

    const ISRC = req.body.ISRC
    if (ISRC) {
        const isrc = await PrismaFindSongISRC(ISRC)
        if (isrc) throw new Api400Error("ISRC Code Already Exists", "ISRC_ERROR");
    }

    const artistExists = await PrismaFindArtist(artist_id)
    if (!artistExists) throw new Api404Error(`Artist ID (${artist_id}) Not Found`, "ARTIST_ID_ERROR")


    const album_id = req.body.album_id;
    if (album_id) {
        const albumExists = await PrismaFindAlbum(album_id)
        if (!albumExists) throw new Api404Error(`Album ID (${album_id}) Not Found`, "ALBUM_ID_ERROR")
    }

    const song = await PrismaCreateSong(song_name, req.body.file_path, artist_id, duration
        , album_id, req.body.publisher, ISRC, req.body.copyright_info, req.body.release_date
        , req.body.genres, req.body.producers, req.body.writers, req.body.engineers)
    console.log(song);

    return res.status(201).send("Song Created Successfully");
}

export async function updateMusicService(req: Request, res: Response) {
    const song_id = req.body.song_id
    if (!song_id) throw new Api400Error('Song ID Is Required', "VALIDATION_ERROR")
    const songExists = await PrismaFindSong(song_id)
    if (!songExists) throw new Api404Error("Song ID Not Found", "SONG_ID_ERROR")

    const ISRC = req.body.ISRC
    if (ISRC) {
        const isrc = await PrismaFindSongISRC(ISRC)
        if (isrc) throw new Api400Error("ISRC Code Already Exists (either change it or don't include it)", "ISRC_ERROR")
    }

    const album_id = req.body.album_id;
    if (album_id) {
        const albumExists = await PrismaFindAlbum(album_id)
        if (!albumExists) throw new Api404Error(`Album ID (${album_id}) Not Found`, "ALBUM_ID_ERROR")
    }

    const updated_song = await PrismaUpdateSong(song_id, album_id, req.body.publisher, ISRC, req.body.copyright_info,
        req.body.release_date, req.body.genres, req.body.producers, req.body.writers, req.body.engineers)
    return res.status(200).send(toJson(updated_song))  // for big int
}

export async function queryMusicService(req: Request, res: Response) {
    const songName = req.query.songName
    if (!songName) throw new Api400Error('Song Name Is Required', "VALIDATION_ERROR")
    const songsExist = await PrismaSongsQuery(`${songName}`)
    if (songsExist.length == 0) throw new Api404Error("No Matching Songs Found", "SONG_NAME_ERROR")
    return res.status(200).send(toJson(songsExist))  // for big int
}


// --------------------------------------------------ARTISTS------------------------------------------------------------- //

export async function addArtistService(req: Request, res: Response) {
    const artist_name = req.body.artist_name
    if (!artist_name) throw new Api400Error(`Artist Name Is Required`, "VALIDATION_ERROR")

    let noErrors = true;
    const albums = req.body.albums_id;
    const songs = req.body.songs_id;

    if (albums) {
        for (let i = 0; i < albums.length; i++) {
            const album = await PrismaFindAlbum(albums[i])
            if (!album) {
                noErrors = false;
                throw new Api404Error(`Album ID (${albums[i]}) Not Found`, "ALBUM_ID_ERROR")
            }
        }
    }
    if (songs && noErrors) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                throw new Api404Error(`Song ID (${songs[i]}) Not Found`, "SONG_ID_ERROR")
            }
        }
    }
    if (noErrors) {
        const artist = await PrismaCreateArtist(artist_name, albums, songs);
        console.log(artist);
        return res.status(200).send("Artist Created Successfully");
    } else {
        throw new Api500Error("Something Went Wrong", "UNKNOWN_ERROR")
    }
}

export async function updateArtistService(req: Request, res: Response) {
    const artist_id = req.body.artist_id;
    if (!artist_id) throw new Api400Error('Artist ID is required', "VALIDATION_ERROR")
    const artistExists = await PrismaFindArtist(artist_id)
    if (!artistExists) throw new Api404Error('Artist ID Not Found', "ARTIST_ID_ERROR")

    let noErrors = true;
    const albums = req.body.albums_id;
    const songs = req.body.songs_id;

    if (albums) {
        for (let i = 0; i < albums.length; i++) {
            const album = await PrismaFindAlbum(albums[i])
            if (!album) {
                noErrors = false;
                throw new Api404Error(`Album ID (${albums[i]}) Not Found`, "ALBUM_ID_ERROR")
            }
        }
    }
    if (songs && noErrors) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                throw new Api404Error(`Song ID (${songs[i]}) Not Found`, "SONG_ID_ERROR")
            }
        }
    }
    if (noErrors) {
        const artist = await PrismaUpdateArtist(artist_id, songs);
        console.log(artist);
        return res.status(200).send("Artist Updated Successfully");
    } else {
        throw new Api500Error("Something Went Wrong", "UNKNOWN_ERROR")
    }
}

export async function queryArtistService(req: Request, res: Response) {
    const artistName = req.query.artistName
    if (!artistName) throw new Api400Error('Artist Name Is Required', "VALIDATION_ERROR")
    const artistsExist = await PrismaArtistsQuery(`${artistName}`)
    if (artistsExist.length == 0) throw new Api404Error("No Matching Artists Found", "ARTIST_NAME_ERROR")
    return res.status(200).send(toJson(artistsExist))
}


// --------------------------------------------------ALBUMS------------------------------------------------------------- //

export async function addAlbumService(req: Request, res: Response) {
    const album_name = req.body.album_name
    if (!album_name) throw new Api400Error('Album Name is required', "VALIDATION_ERROR")
    const release_date = req.body.release_date
    if (!release_date) throw new Api400Error('Release Date is required', "VALIDATION_ERROR")

    let noErrors = true;
    const artist_id = req.body.artist_id
    const feat_artists = req.body.feat_artist_id;
    const genres = req.body.genres;

    const artist = await PrismaFindArtist(artist_id)
    if (!artist) throw new Api404Error(`Artist ID (${artist_id}) Not Found`, "ARTIST_ID_ERROR")
    if (feat_artists) {
        for (let i = 0; i < feat_artists.length; i++) {
            const artist = await PrismaFindArtist(feat_artists[i])
            if (!artist) {
                noErrors = false;
                throw new Api404Error(`Artist ID (${feat_artists[i]}) Not Found`, "ARTIST_ID_ERROR")
            }
        }
    }
    if (genres && noErrors) {
        for (let i = 0; i < genres.length; i++) {
            if (!(genres[i] in Genres)) {
                noErrors = false;
                throw new Api404Error(`Genre (${genres[i]}) Not Found`, "GENRE_ID_ERROR")
            }
        }
    }
    if (noErrors) {
        const album = await PrismaCreateAlbum(album_name, artist_id, release_date, feat_artists, genres)
        console.log(album);
        return res.status(201).send("Album Created Successfully");
    } else {
        throw new Api500Error("Something Went Wrong", "UNKNOWN_ERROR")
    }
}

export async function updateAlbumService(req: Request, res: Response) {
    const album_id = req.body.album_id
    if (!album_id) throw new Api400Error('Album ID is required', "VALIDATION_ERROR")
    const albumExists = await PrismaFindAlbum(album_id)
    if (!albumExists) throw new Api404Error('Artist ID Not Found', "ALBUM_ID_ERROR")

    let noErrors = true;
    const songs = req.body.songs_id;
    const genres = req.body.genres;

    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                throw new Api404Error(`Song ID (${songs[i]}) Not Found`, "SONG_ID_ERROR")
            }
        }
    }
    if (genres && noErrors) {
        for (let i = 0; i < genres.length; i++) {
            if (!(genres[i] in Genres)) {
                noErrors = false;
                throw new Api404Error(`Genre (${genres[i]}) Not Found`, "GENRE_ID_ERROR")
            }
        }
    }
    if (noErrors) {
        const album = await PrismaUpdateAlbum(album_id, songs, genres)
        console.log(album);
        return res.status(200).send("Album Updated Successfully");
    } else {
        throw new Api500Error("Something Went Wrong", "UNKNOWN_ERROR")
    }
}

export async function queryAlbumService(req: Request, res: Response) {
    const albumName = req.query.albumName
    if (!albumName) throw new Api400Error('Album Name Is Required', "VALIDATION_ERROR")
    const albumsExist = await PrismaAlbumsQuery(`${albumName}`)
    if (albumsExist.length == 0) throw new Api404Error("No Matching Albums Found", "ALBUM_ID_ERROR")
    return res.status(200).send(toJson(albumsExist))
}


// --------------------------------------------------PLAYLISTS------------------------------------------------------------- //

export async function addPlaylistService(req: Request, res: Response) {
    const user_id = req.body.user_id
    if (!user_id) throw new Api400Error('User ID Is Required', "VALIDATION_ERROR")
    const user = await PrismaFindUser(user_id)
    if (!user) throw new Api404Error(`User (${user_id}) Not Found`, "USER_ID_ERROR")

    let noErrors = true;
    const songs = req.body.songs_id;
    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) {
                noErrors = false;
                throw new Api404Error(`Song ID (${songs[i]}) Not Found`, "SONG_ID_ERROR")
            }
        }
    }

    if (noErrors) {
        const playlist = await PrismaCreatePlaylist(req.body.playlist_name, user_id, songs)
        console.log(playlist)
        return res.status(201).send("Playlist Created Successfully");
    } else {
        throw new Api500Error("Something Went Wrong", "UNKNOWN_ERROR")
    }

}

export async function updatePlaylistService(req: Request, res: Response) {
    const playlist_id = req.body.playlist_id;
    if (!playlist_id) throw new Api400Error('Playlist ID is required', "VALIDATION_ERROR")
    const user_id = req.body.user_id;
    if (!user_id) throw new Api400Error('User ID is required', "VALIDATION_ERROR")

    const playlistExists = await PrismaFindPlaylist(playlist_id)
    if (!playlistExists) throw new Api404Error('Playlist ID Not Found', "PLAYLIST_ID_ERROR")

    const userExists = await PrismaFindUser(playlist_id)
    if (!userExists) throw new Api404Error('User ID Not Found', "USER_ID_ERROR")

    const songs = req.body.songs_id;
    if (songs) {
        for (let i = 0; i < songs.length; i++) {
            const song = await PrismaFindSong(songs[i])
            if (!song) throw new Api404Error(`Song ID (${songs[i]}) Not Found`, "SONG_ID_ERROR")
        }
    }

    const playlist_update = await PrismaUpdatePlaylist(playlist_id, user_id, req.body.playlist_name, songs)
    console.log(playlist_update)
    return res.status(200).send("Playlist updated Successfully");
}

export async function queryPlaylistService(req: Request, res: Response) {
    const user_id = req.params.user_id
    if (!user_id) throw new Api400Error('User ID Is Required', "VALIDATION_ERROR")
    const playlists = await PrismaPlaylistsQuery(user_id)
    if (playlists.length == 0) throw new Api404Error("No Matching Playlists Found", "PLAYLIST_NAME_ERROR")
    return res.status(200).send(playlists)
}


// -------------------------------------------------ACTIONS------------------------------------------------------------ //

export async function createOrDeleteActionsService(req: Request, res: Response) {
    const user_id = req.body.user_id;
    if (!user_id) throw new Api400Error('User ID is required', "VALIDATION_ERROR");
    const target_id = req.body.target_id;
    if (!target_id) throw new Api400Error('Target ID is required', "VALIDATION_ERROR");
    const action_type = req.body.action_type;
    if (!action_type) throw new Api400Error('Action is required', "VALIDATION_ERROR");
    if (!(action_type in Action)) throw new Api400Error('Action not Valid', "VALIDATION_ERROR");

    const userExists = await PrismaFindUser(user_id);
    if (!userExists) throw new Api404Error('User ID Not Found', "USER_ID_ERROR");


    const song = await PrismaFindSong(target_id);
    const artist = await PrismaFindArtist(target_id);
    const album = await PrismaFindAlbum(target_id);
    console.log([song, artist, album]);
    if (album == null && song == null && artist == null) throw new Api404Error('Target Not Found', "TARGET_ID_ERROR");

    const actions_update = await PrismaCreateOrDeleteAction(user_id, target_id, action_type)

    if (actions_update === null) throw new Api500Error('Something went wrong', "ACTION_UPDATE_ERROR")
    console.log(actions_update)

    if (!actions_update) return res.status(200).send("Actions Deleted Successfully");
    return res.status(200).send("Action Created Successfully");
}

export async function queryActionsService(req: Request, res: Response) {
    const user_id = req.query.userId
    if (!user_id) throw new Api400Error('User ID Is Required', "VALIDATION_ERROR")

    const userExists = await PrismaFindUser(`${user_id}`);
    if (!userExists) throw new Api404Error('User ID Not Found', "USER_ID_ERROR");

    const actionType = req.query.type
    if (!actionType) throw new Api400Error('Action Type Is Required', "VALIDATION_ERROR")
    if (!(`${actionType}` in Action)) throw new Api400Error('Action not Valid', "VALIDATION_ERROR");

    const actions = await PrismaActionsQuery(`${user_id}`, actionType as Action)
    if (actions.length == 0) throw new Api404Error("No Matching Actions Found", "ACTION_QUERY_ERROR")
    return res.status(200).send(actions)
}
