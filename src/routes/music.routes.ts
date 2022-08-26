import { addMusic, addPlaylist, addArtist, addAlbum } from "../controllers/music.controller";


const router = require('express').Router();


/**
 * @swagger
 * /music/addMusic:
 *  post:
 *      tags: [Music]
 *      summary: Create a new Song
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Song'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/addMusic', addMusic);


/**
 * @swagger
 * /music/addPlaylist:
 *  post:
 *      tags: [Music]
 *      summary: Create a new Playlist
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Playlist'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/addPlaylist', addPlaylist);


/**
 * @swagger
 * /music/addArtist:
 *  post:
 *      tags: [Music]
 *      summary: Create a new Artist
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Artist'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/addArtist', addArtist);


/**
 * @swagger
 * /music/addAlbum:
 *  post:
 *      tags: [Music]
 *      summary: Create a new Album
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Album'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/addAlbum', addAlbum);


export default router;
