import { Request, Response } from "express";
import {
    addMusicService, addArtistService, addAlbumService, addPlaylistService
    , queryAlbumService, queryArtistService, queryMusicService, queryPlaylistService, queryFavoritesService
} from "../services/music.service";


export async function addMusic(req: Request, res: Response) {
    addMusicService(req, res)
};
export async function queryMusic(req: Request, res: Response) {
    queryMusicService(req, res)
};


export async function addArtist(req: Request, res: Response) {
    addArtistService(req, res)
};
export async function queryArtist(req: Request, res: Response) {
    queryArtistService(req, res)
};


export async function addPlaylist(req: Request, res: Response) {
    addPlaylistService(req, res);
};
export async function queryPlaylist(req: Request, res: Response) {
    queryPlaylistService(req, res);
};


export async function addAlbum(req: Request, res: Response) {
    addAlbumService(req, res);
};
export async function queryAlbum(req: Request, res: Response) {
    queryAlbumService(req, res);
};


export async function queryFavorites(req: Request, res: Response) {
    queryFavoritesService(req, res);
}
