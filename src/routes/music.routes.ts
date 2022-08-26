import {
    addMusic, queryMusic, addPlaylist, queryPlaylist, addArtist,
    queryArtist, addAlbum, queryAlbum, queryFavorites
} from "../controllers/music.controller";


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
 * /music/queryMusic:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of songs
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongQuery'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/queryMusic', queryMusic);


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
 * /music/queryArtist:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of Artists
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ArtistQuery'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/queryArtist', queryArtist);


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
 * /music/queryPlaylist:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of Artists
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PlaylistQuery'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/queryPlaylist', queryPlaylist);


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

/**
 * @swagger
 * /music/queryAlbum:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of Artists
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AlbumQuery'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/queryAlbum', queryAlbum);


/**
 * @swagger
 * /music/queryFavorites:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of Artists
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FavoritesQuery'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/queryFavorites', queryFavorites);


export default router;
