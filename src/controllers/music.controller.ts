import { Request, Response } from "express";
import { addMusicService, addArtistService } from "../services/music.service";

export async function addArtist(req: Request, res: Response) {
    addArtistService(req, res)
};


export async function addMusic(req: Request, res: Response) {
    addMusicService(req, res)
};


export async function addPlaylist(req: Request, res: Response) {
    res.status(200).send("Add some playlist");
};


export async function addAlbum(req: Request, res: Response) {
    res.status(200).send("Add some playlist");
};
