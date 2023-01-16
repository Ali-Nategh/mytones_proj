import authenticateToken from "../middlewares/authenticateToken.middleware";
import { getSong, uploadSong } from "../controllers/static.controller";


const router = require('express').Router();


/**
 * @swagger
 * /static/{song_path}:
 *  get:
 *      tags: [Statics]
 *      security:
 *          - bearerAuth: []
 *          - ApiKeyAuth: []
 *      summary: Get a Song File by path
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
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went searching for song
 */
router.get('/:song_path', authenticateToken, getSong);


/**
 * @swagger
 * /static/{song_path}:
 *  post:
 *      tags: [Statics]
 *      security:
 *          - bearerAuth: []
 *          - ApiKeyAuth: []
 *      summary: upload a Song File with path
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
 *          '400':
 *              description: Bad Request, information invalid
 *          '500': 
 *              description: Something went searching for song
 */
router.post('/:song_path', authenticateToken, uploadSong);


export default router;
