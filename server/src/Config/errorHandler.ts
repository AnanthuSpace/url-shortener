import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';

    if (err.name === 'ValidationError') {
        statusCode = 400; 
        message = err.message;
    } else if (err.name === 'MongoError') {
        statusCode = 500; 
        message = 'Database error occurred';
    }

    console.error(err);

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), 
    });
};

export default errorHandler;
