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
 * /music/song:
 *  post:
 *      tags: [Music]
 *      summary: Create and Upload a new Song
 *      requestBody:
 *          required: true
 *          content: 
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          songUpload:
 *                              type: string
 *                              format: binary
 *                          Song:
 *                              $ref: '#/components/schemas/Song'
 *      responses:
 *          '201': 
 *              description: Song was successfully created
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went wrong creating song
 */
router.post('/song', addMusic);

/**
 * @swagger
 * /music/song:
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
router.patch('/song', updateMusic);

/**
 * @swagger
 * /music/song:
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
router.get('/song', queryMusic);



/**
 * @swagger
 * /music/artist:
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
router.post('/artist', addArtist);

/**
 * @swagger
 * /music/artist:
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
router.patch('/artist', updateArtist);

/**
 * @swagger
 * /music/artist:
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
router.get('/artist', queryArtist);



/**
 * @swagger
 * /music/album:
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
router.post('/album', addAlbum);

/**
 * @swagger
 * /music/album:
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
router.patch('/album', updateAlbum);

/**
 * @swagger
 * /music/album:
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
router.get('/album', queryAlbum);



/**
 * @swagger
 * /music/playlist:
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
router.post('/playlist', addPlaylist);

/**
 * @swagger
 * /music/playlist:
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
router.patch('/playlist', updatePlaylist);

/**
 * @swagger
 * /music/playlist/{user_id}:
 *  get:
 *      tags: [Music]
 *      summary: Get a Playlist by user_id
 *      parameters:
 *      - in: path
 *        name: user_id
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
router.get('/playlist/:user_id', queryPlaylist);


/**
 * @swagger
 * /music/actions:
 *  put:
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
router.put('/actions', updateActions);

/**
 * @swagger
 * /music/actions:
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
router.get('/actions', queryActions);


export default router;
