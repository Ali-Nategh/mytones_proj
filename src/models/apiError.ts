export default class ApiError extends Error {
    message: string;
    code: number;
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
        this.message = message;
    }

    static badRequest(msg: string) {
        return new ApiError(400, msg);
    };

    static notAuthorized(msg: string) {
        return new ApiError(403, msg);
    };

    static internalError(msg: string) {
        return new ApiError(500, msg);
    };
}