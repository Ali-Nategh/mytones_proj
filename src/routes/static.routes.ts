import authenticateToken from "../middlewares/authenticateToken.middleware";
import { getSong, } from "../controllers/static.controller";

// import multer from "multer"
// import path from "path";
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.normalize(`${__dirname}/../public`));
//     },
//     filename: (req, file, cb) => {
//         const { originalname } = file;
//         cb(null, originalname);
//     },
// });
// const upload = multer({ storage });

const router = require('express').Router();


/**
 * @swagger
 * /static/{song_path}:
 *  get:
 *      tags: [Statics]
 *      security:
 *          - bearerAuth: []
 *          - ApiKeyAuth: []
 *      summary: Download a Song File by path (To upload, use addMusic)
 *      parameters:
 *      - in: path
 *        name: song_path
 *        required: true
 *        schema:
 *          type: string
 *        description: The path of the song in public folder
 *        example: SongTest1MaraBeboos.mp3
 *      responses:
 *          '200': 
 *              description: Song successfully found
 *              schema:
 *                  type: string
 *                  format: binary
 *          '400':
 *              description: Bad Request, Song not found
 *          '403':
 *              description: Token has a problem, either missing or expired
 *          '500': 
 *              description: Something went searching for song
 */
router.get('/:song_path',
    authenticateToken,
    getSong,
);


// /**
//  * @swagger
//  * /static/upload:
//  *  post:
//  *      tags: [Statics]
//  *      security:
//  *          - bearerAuth: []
//  *          - ApiKeyAuth: []
//  *      summary: Upload a Song File with file name
//  *      requestBody:
//  *          content:
//  *              multipart/form-data:
//  *                  schema:
//  *                      type: object
//  *                      properties:
//  *                          songUpload:
//  *                              type: string
//  *                              format: binary
//  *      responses:
//  *          '200': 
//  *              description: Song successfully found
//  *          '400':
//  *              description: Bad Request, information invalid
//  *          '500': 
//  *              description: Something went searching for song
//  */
// router.post('/upload',
//     // authenticateToken,
//     upload.single('songUpload'),
//     uploadSong,
// );


export default router;
