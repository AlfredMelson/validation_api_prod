"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verification = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader)
        return res.sendStatus(401);
    console.log('authHeader:', authHeader);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, '49d602b423a56b281168f50b58d444af414c819ee9d75ff674e6668361123626fc4a67a07e859d76fee75c1fd7c7071b1d28bc798f6e47835d72f8e48ab77972', (err, decoded) => {
        if (err)
            return res.sendStatus(403);
        req.user = decoded.username;
        next();
    });
};
exports.default = verification;
