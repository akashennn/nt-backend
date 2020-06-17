import {Response} from 'express';

enum StatusCode {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

abstract class Error {
    protected constructor(
        protected status: StatusCode,
        protected error: any[][]
    ) {
    }

    protected prepare<T extends Error>(res: Response, response: T): Response {
        return res.status(this.status).json(Error.sanitize(response));
    }

    private static sanitize<T extends Error>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        delete clone.status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

export class NewDomainError extends Error {
    constructor(error = []) {
        super(StatusCode.NOT_FOUND, error);
    }

    send(res: Response): Response {
        return super.prepare<NewDomainError>(res, this);
    }
}

export class NewValidationError extends Error {
    constructor(error = []) {
        super(StatusCode.BAD_REQUEST, error);
    }

    send(res: Response): Response {
        return super.prepare<NewValidationError>(res, this);
    }
}

export class NewApplicationError extends Error {
    constructor(error = []) {
        super(StatusCode.INTERNAL_ERROR, error);
    }

    send(res: Response): Response {
        return super.prepare<NewApplicationError>(res, this);
    }
}
