import { logError, returnError } from '../errors/errorHandler';
import { Request, Response, NextFunction } from 'express';
import Api404Error from '../errors/api404Error';
const router = require('express').Router();
import swaggerUi from 'swagger-ui-express';
import staticRoute from './static.routes';
import swaggerJsDoc from 'swagger-jsdoc';
import musicRoute from './music.routes';
import adminRoute from './admin.routes';
import userRoute from './user.routes';
import homeRoute from './main.routes';
import morgan from 'morgan';

// Logger
router.use(morgan('dev'));

// Documentation
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Mytones API',
            version: "1.0.0",
            description: 'Mytones API information',
            contact: {
                name: "Ali Nategh"
            },
        },
        servers: [
            {
                url: "http://localhost:5000/"
            },
            {
                url: __dirname
            },
        ],
    },
    apis: ["src/routes/*.ts"]
}
const specs = swaggerJsDoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


router.use('/', homeRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);
router.use('/music', musicRoute);
router.use('/static', staticRoute);


// Uncought Errors handling
router.use((req: Request, res: Response, next: NextFunction) => {
    next(new Api404Error('Page not found'));
})
router.use(logError);
router.use(returnError);


export default router;


// Documentation Schemas
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - name
 *              - lastname
 *              - email
 *              - password
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username
 *              name:
 *                  type: string
 *                  description: User Name
 *              lastname:
 *                  type: string
 *                  description: User Lastname
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: password
 *                  description: User password
 *              age:
 *                  oneOf: 
 *                      - type: string
 *                      - type: integer
 *                  description: Optional Age of the user
 *          example:
 *              username: JohnDoe
 *              name: John
 *              lastname: Doe
 *              email: JohnDoe@examle.com
 *              password: Password
 *              age: 22 (optional)
 *      SongDownload:
 *          type: object
 *          required:
 *              song_path
 *          properties:
 *              song_path:
 *                  type: string
 *                  description: Song's path in the public folder
 *          example:
 *              song_path: RandomSong.mp3
 *      Song:
 *          type: object
 *          required:
 *              - song_name
 *              - artist_id
 *              - duration
 *          properties:
 *              song_name:
 *                  type: string
 *                  description: Song's official name
 *              artist_id:
 *                  type: string
 *                  description: Song's artist id
 *              duration:
 *                  type: string
 *                  description: The duration of the song
 *              album_id:
 *                  type: string
 *                  description: If the song is in an album
 *              copyright_info:
 *                  type: string
 *                  description: If there is any copyright information
 *              ISRC:
 *                  type: string
 *                  description: International Standard Recording Code
 *              publisher:
 *                  description: Song's Publisher
 *                  type: string
 *              release_date:
 *                  description: The release date of the song
 *                  type: date
 *              genres:
 *                  description: An array of genre(s) specified in the database [POP/CLASSICAL/INSTRUMENTAL/ROCK/HIPHOP/RAP/JAZZ/METAL/COUNTRY/ELECTRONIC/BLUES/INDIE/DANCE/SOUL/LATIN/DUBSTEP/TECHNO/FOLK/EMO/GOSPEL/HOUSE/RnB/PSYCHEDELIC/DISCO/PUNK/COVER/KPOP]
 *                  type: array
 *                  items: 
 *                      type: string
 *              producers:
 *                  description: An array of producer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *              writers:
 *                  description: An array of writer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *              engineers:
 *                  description: An array of engineer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *          example:
 *              song_name: RandomSong
 *              artist_id: adsfg546dth1d3t1b68
 *              duration: 2:32
 *              album_id: OPTIONAL_DeleteIfYouHaventCreatedAnAlbum
 *              copyright_info: Copyright © 2022 All rights reserved (Allin Records)
 *              publisher: John Doe from Allin Records
 *              ISRC: CCXXXYYNNNNN
 *              release_date: 2017-07-21
 *              genres: [HIPHOP, RAP]
 *              producers: [Allin, some doctor Dre guy, Havoc, Jdilla]
 *              writers: [John, Doe]
 *              engineers: [John, DoeJr]
 *      SongUpdate:
 *          type: object
 *          required:
 *              - song_id
 *          properties:
 *              song_id:
 *                  type: string
 *                  description: Song's ID
 *              album_id:
 *                  type: string
 *                  description: If the song is in an album
 *              copyright_info:
 *                  type: string
 *                  description: If there is any copyright information
 *              ISRC:
 *                  type: string
 *                  description: International Standard Recording Code
 *              publisher:
 *                  description: Song's Publisher
 *                  type: string
 *              release_date:
 *                  description: The release date of the song
 *                  type: date
 *              genres:
 *                  description: An array of genre(s) specified in the database [POP/CLASSICAL/INSTRUMENTAL/ROCK/HIPHOP/RAP/JAZZ/METAL/COUNTRY/ELECTRONIC/BLUES/INDIE/DANCE/SOUL/LATIN/DUBSTEP/TECHNO/FOLK/EMO/GOSPEL/HOUSE/RnB/PSYCHEDELIC/DISCO/PUNK/COVER/KPOP]
 *                  type: array
 *                  items: 
 *                      type: string
 *              producers:
 *                  description: An array of producer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *              writers:
 *                  description: An array of writer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *              engineers:
 *                  description: An array of engineer(s) name(s)
 *                  type: array
 *                  items: 
 *                      type: string
 *          example:
 *              song_id: sgh51st5hs1521h3s5fh
 *              album_id: hyffnyg546dtfjf5lpo
 *              copyright_info: Copyright © 2022 All rights reserved (Allin Records)
 *              publisher: John Doe from Allin Records
 *              ISRC: CCXXXYYNNNNN
 *              release_date: 2017-07-21
 *              genres: [HIPHOP, RAP]
 *              producers: [Allin, some doctor Dre guy, Havoc, Jdilla]
 *              writers: [John, Doe]
 *              engineers: [John, DoeJr]
 *      Artist:
 *          type: object
 *          required:
 *              - artist_name
 *          properties:
 *              artist_name:
 *                  description: Artist Name
 *                  type: string
 *          example:
 *              artist_name: JohnDoeTheTrickster
 *      ArtistUpdate:
 *          type: object
 *          required:
 *              - artist_id
 *          properties:
 *              artist_id:
 *                  description: Artist ID
 *                  type: string
 *              albums_id:
 *                  description: An array of Artist's albums id
 *                  type: array
 *                  items: 
 *                      type: string
 *              songs_id:
 *                  description: An array of Artist's songs id
 *                  type: array
 *                  items: 
 *                      type: string
 *          example:
 *              artist_id: hsjfgd9r557j6f5gd5
 *              albums_id: [365756yhkhjfsdhss67, 3h56h5g7j6f5gd5356756h]
 *              songs_id: [oljhkhjl542j4d6hjdf, gsjf8g6sb5fg357j6f5gd5]
 *      Album:
 *          type: object
 *          required:
 *              - album_name 
 *              - artist_id
 *              - release_date
 *              - songs_id
 *          properties:
 *              album_name:
 *                  description: Album's Name
 *                  type: string
 *              artist_id:
 *                  description: Album Artist's id
 *                  type: string
 *              release_date:
 *                  description: Album's release date
 *                  type: string
 *              feat_artists:
 *                  description: An array of Album's featuring artists id
 *                  type: array
 *                  items:
 *                      type: string
 *              genres:
 *                  description: An array of Album's genres [POP/CLASSICAL/INSTRUMENTAL/ROCK/HIPHOP/RAP/JAZZ/METAL/COUNTRY/ELECTRONIC/BLUES/INDIE/DANCE/SOUL/LATIN/DUBSTEP/TECHNO/FOLK/EMO/GOSPEL/HOUSE/RnB/PSYCHEDELIC/DISCO/PUNK/COVER/KPOP]
 *                  type: array
 *                  items:
 *                      type: string
 *          example:
 *              album_name: RandomAlbum
 *              artist_id: 365756yh5gd5356756h
 *              release_date: 2017-07-21
 *              feat_artists_id: [oljhkhjl542j4d6hjdf, gsjf8g6sb5fg357j6f5gd5]
 *              genres: [HIPHOP, RAP]
 *      AlbumUpdate:
 *          type: object
 *          required:
 *              - album_id
 *          properties:
 *              album_id:
 *                  description: Album's ID
 *                  type: string
 *              feat_artists:
 *                  description: An array of Album's feat artists id
 *                  type: array
 *                  items:
 *                      type: string
 *              genres:
 *                  description: An array of Album's genres [POP/CLASSICAL/INSTRUMENTAL/ROCK/HIPHOP/RAP/JAZZ/METAL/COUNTRY/ELECTRONIC/BLUES/INDIE/DANCE/SOUL/LATIN/DUBSTEP/TECHNO/FOLK/EMO/GOSPEL/HOUSE/RnB/PSYCHEDELIC/DISCO/PUNK/COVER/KPOP]
 *                  type: array
 *                  items:
 *                      type: string
 *          example:
 *              album_id: sdfh65s16th5sf6gh51s
 *              feat_artists: [oljhkhjl542j4d6hjdf, gsjf8g6sb5fg357j6f5gd5]
 *              genres: [HIPHOP, RAP]
 *      Playlist:
 *          type: object
 *          required:
 *              - playlist_name
 *              - user_id
 *          properties:
 *              playlist_name:
 *                  description: User Playlist Name
 *                  type: string
 *              user_id:
 *                  description: User's id
 *                  type: string
 *          example:
 *              playlist_name: MyPlaylist1
 *              user_id: d5j4d6hj15d6y5j4d6gh5
 *      PlaylistUpdate:
 *          type: object
 *          required:
 *              - playlist_id
 *              - user_id
 *          properties:
 *              playlist_id:
 *                  description: User Playlist ID
 *                  type: string
 *              user_id:
 *                  description: User's id
 *                  type: string
 *              playlist_name:
 *                  description: User Playlist Name
 *                  type: string
 *          example:
 *              playlist_id: dgf65dh16t84d6g5h1
 *              user_id: d5j4d6hj15d6y5j4d6gh5
 *              playlist_name: MyPlaylist1-1
 *      Actions:
 *          type: object
 *          required:
 *              - action_type
 *              - user_id
 *              - target_id
 *          properties:
 *              action_type:
 *                  description: Actions Type [LIKE/PLAY/SONGS/ARTISTS/ALBUMS/DOWNLOADS]
 *                  type: string
 *              user_id:
 *                  description: User's id
 *                  type: string
 *              target_id:
 *                  description: Target's id [Song/Album/Artist]
 *                  type: string
 *          example:
 *              action_type: DOWNLOADS  
 *              user_id: 365756yh5gd5356756h
 *              target_id: oljhkhjl542j4d6hjdf
 *      UserLogin:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *              password:
 *                  type: string
 *                  description: User password
 *          example:
 *              email: JohnDoe@examle.com
 *              password: Password
 *      EmailValid:
 *          type: object
 *          required:
 *              - email
 *              - otp
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *              otp:
 *                  type: string
 *                  description: Sent password
 *          example:
 *              email: JohnDoe@examle.com
 *              otp: "156482"
 *      Email:
 *          type: object
 *          required:
 *              - email
 *          properties:
 *              email:
 *                  type: string
 *                  description: User email
 *          example:
 *              email: JohnDoe@examle.com
 *      Token:
 *          type: object
 *          required:
 *              token
 *          properties:
 *              token:
 *                  type: string
 *                  description: jwt token
 *          example:
 *              token: afjlkd2jflsi4fghs7jg.sdfisjgp4sodk7lskfhpwej.sdpjfi7sjp4gosdgpsm
 *      AccessToken:
 *          type: object
 *          required:
 *              authorization
 *          properties:
 *              authorization:
 *                  type: string
 *                  description: jwt token
 *          example:
 *              authorization: Bearer afjlkd2jflsi4fghs7jg.sdfisjgp4sodk7lskfhpwej.sdpjfi7sjp4gosdgpsm
 */

/**
 * @swagger
 * tags:
 *  - name: HomePage
 *    description:
 *  - name: Users
 *    description: The Users management API
 *  - name: Admin
 *    description: The Admin's API
 *  - name: Statics
 *    description: The Static files management API
 *  - name: Music
 *    description: The Music management API
 */
