import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import HTTP_statusCode from "../Enums/httpStatusCode";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;
const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRATION!;
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRATION!;

interface JwtPayload {
    userId: string;
    email?: string;
    role?: string;
}

interface CustomRequest extends Request {
    id?: string;
    email?: string;
}

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, accessTokenSecret, { expiresIn: accessTokenExpire });
}

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: refreshTokenExpire });
}

export const verifyToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const verificationHeader = req.headers.authorization;
    const refreshToken = req.headers['x-refresh-token'] as string;

    if (!verificationHeader) {
        res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. No token provided' });
        return;
    }

    const accessToken = verificationHeader.split(' ')[1];
    if (!accessToken) {
        res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Access token not valid' });
        return;
    }

    jwt.verify(accessToken, accessTokenSecret, async (err, decoded) => {
        if (err && err.name === 'TokenExpiredError') {
            if (!refreshToken) {
                res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Refresh token not provided' });
                return;
            }
            jwt.verify(refreshToken, refreshTokenSecret, (refreshErr, refreshDecoded) => {
                if (refreshErr) {
                    res.status(401).json({ message: 'Access denied. Refresh token invalid or expired' });
                    return;
                }
                const userId = (refreshDecoded as JwtPayload).userId;
                const newAccessToken = jwt.sign({ userId }, accessTokenSecret, { expiresIn: accessTokenExpire });
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                req.id = userId;
                next();
            });
        } else if (err) {
            res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. Access token not valid' });
            return;
        } else {
            req.id = (decoded as JwtPayload).userId;
            next();
        }
    });
};

