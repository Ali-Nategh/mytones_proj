import {
    addMusic, updateMusic, queryMusic,
    addPlaylist, updatePlaylist, queryPlaylist,
    addArtist, updateArtist, queryArtist,
    addAlbum, updateAlbum, queryAlbum,
    queryActions, updateActions,
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
 *  patch:
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
router.patch('/updateMusic', updateMusic);

/**
 * @swagger
 * /music/queryMusic:
 *  get:
 *      tags: [Music]
 *      summary: Get a list of songs by name
 *      parameters:
 *      - in: query
 *        name: songName
 *        schema:
 *          type: string
 *        description: The name of the Song
 *        example: RandomSong
 *      responses:
 *          '200': 
 *              description: Songs Found successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for songs
 */
router.get('/queryMusic', queryMusic);



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
 *  patch:
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
router.patch('/updateArtist', updateArtist);

/**
 * @swagger
 * /music/queryArtist:
 *  get:
 *      tags: [Music]
 *      summary: Get a list of Artists by name
 *      parameters:
 *      - in: query
 *        name: artistName
 *        schema:
 *          type: string
 *        description: The name of the Artist
 *        example: JohnDoeTheTrickster
 *      responses:
 *          '200': 
 *              description: Artists found successfully
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for artists
 */
router.get('/queryArtist', queryArtist);



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
 *  patch:
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
router.patch('/updateAlbum', updateAlbum);

/**
 * @swagger
 * /music/queryAlbum:
 *  get:
 *      tags: [Music]
 *      summary: Get a list of Albums by name
 *      parameters:
 *      - in: query
 *        name: albumName
 *        schema:
 *          type: string
 *        description: The name of the Album
 *        example: RandomAlbum
 *      responses:
 *          '200': 
 *              description: Albums successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for albums
 */
router.get('/queryAlbum', queryAlbum);



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
 *  patch:
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
router.patch('/updatePlaylist', updatePlaylist);

/**
 * @swagger
 * /music/queryPlaylist/{userId}:
 *  get:
 *      tags: [Music]
 *      summary: Get a Playlist by user_id
 *      parameters:
 *      - in: path
 *        name: albumName
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the User
 *        example: fgsd46th5s1t6h8st4h
 *      responses:
 *          '200': 
 *              description: Playlists successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went searching for Playlists
 */
router.get('/queryPlaylist/:userId', queryPlaylist);


/**
 * @swagger
 * /music/updateActions:
 *  patch:
 *      tags: [Music]
 *      summary: Update Actions (Creates / Deletes if it exists)
 *      requestBody:
 *          required: true
 *          content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Actions'
 *      responses:
 *          '200': 
 *              description: Actions successfully updated
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong updating the Actions
 */
router.patch('/updateActions', updateActions);

/**
 * @swagger
 * /music/queryActions:
 *  get:
 *      tags: [Music]
 *      summary: Get a list of user actions
 *      parameters:
 *      - in: query
 *        name: userId
 *        schema:
 *          type: string
 *        description: The ID of the User
 *        example: f5h1fgj64dgh6j51
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        description: The type of the Playlist
 *        example: DOWNLOADS
 *      responses:
 *          '200': 
 *              description: Actions successfully found
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong searching for Actions
 */
router.get('/queryActions', queryActions);


export default router;
