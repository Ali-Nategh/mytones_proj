import { Request, Response } from "express";
import { addMusicService, addArtistService, addAlbumService, addPlaylistService } from "../services/music.service";


export async function addMusic(req: Request, res: Response) {
    addMusicService(req, res)
};


export async function addArtist(req: Request, res: Response) {
    addArtistService(req, res)
};


export async function addPlaylist(req: Request, res: Response) {
    addPlaylistService(req, res);
};


export async function addAlbum(req: Request, res: Response) {
    addAlbumService(req, res);
};
