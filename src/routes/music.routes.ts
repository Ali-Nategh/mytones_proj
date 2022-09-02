import {
    addMusic, updateMusic, queryMusic,
    addPlaylist, updatePlaylist, queryPlaylist,
    addArtist, updateArtist, queryArtist,
    addAlbum, updateAlbum, queryAlbum,
    queryFavorites, updateFavorites,
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
 * /music/updateMusic:
 *  post:
 *      tags: [Music]
 *      summary: Update a Song's info ( you can delete unnecessary options from the example )
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SongUpdate'
 *      responses:
 *          '200': 
 *              description: Song was successfully updated
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating song
 */
router.post('/updateMusic', updateMusic);

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
 *          '200': 
 *              description: Songs Found successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for songs
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
 *              description: Artist was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating Artist
 */
router.post('/addArtist', addArtist);

/**
 * @swagger
 * /music/updateArtist:
 *  post:
 *      tags: [Music]
 *      summary: Update an Artist's info ( you can delete unnecessary options from the example )
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ArtistUpdate'
 *      responses:
 *          '200': 
 *              description: Artist was successfully updated
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating the artist
 */
router.post('/updateArtist', updateArtist);

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
 *          '200': 
 *              description: Artists found successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for artists
 */
router.post('/queryArtist', queryArtist);



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
 *              description: Album was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating Album
 */
router.post('/addAlbum', addAlbum);

/**
 * @swagger
 * /music/updateAlbum:
 *  post:
 *      tags: [Music]
 *      summary: Update an Album's info ( you can delete unnecessary options from the example )
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AlbumUpdate'
 *      responses:
 *          '200': 
 *              description: Album updated successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating Album
 */
router.post('/updateAlbum', updateAlbum);

/**
 * @swagger
 * /music/queryAlbum:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of Albums
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AlbumQuery'
 *      responses:
 *          '201': 
 *              description: Albums successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for albums
 */
router.post('/queryAlbum', queryAlbum);



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
 *              description: Playlist was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating Playlist
 */
router.post('/addPlaylist', addPlaylist);

/**
 * @swagger
 * /music/updatePlaylist:
 *  post:
 *      tags: [Music]
 *      summary: Update a Playlist's info ( you can delete unnecessary options from the example )
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PlaylistUpdate'
 *      responses:
 *          '200': 
 *              description: Playlist updated successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating the playlist
 */
router.post('/updatePlaylist', updatePlaylist);

/**
 * @swagger
 * /music/queryPlaylist:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of user Playlists
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PlaylistQuery'
 *      responses:
 *          '201': 
 *              description: Playlists successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went searching for Playlists
 */
router.post('/queryPlaylist', queryPlaylist);


/**
 * @swagger
 * /music/updateFavorites:
 *  post:
 *      tags: [Music]
 *      summary: Update songs of a user's favorites
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Favorites'
 *      responses:
 *          '200': 
 *              description: Favorites successfully updated
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating the favorites
 */
router.post('/updateFavorites', updateFavorites);

/**
 * @swagger
 * /music/queryFavorites:
 *  post:
 *      tags: [Music]
 *      summary: Get a list of user favorites
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/FavoritesQuery'
 *      responses:
 *          '201': 
 *              description: Favorites successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for Favorites
 */
router.post('/queryFavorites', queryFavorites);


export default router;
