"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJwtRefreshToken = exports.createJwtAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJwtAccessToken = (administrator) => jsonwebtoken_1.default.sign({ username: administrator }, '49d602b423a56b281168f50b58d444af414c819ee9d75ff674e6668361123626fc4a67a07e859d76fee75c1fd7c7071b1d28bc798f6e47835d72f8e48ab77972', { expiresIn: '1d' });
exports.createJwtAccessToken = createJwtAccessToken;
const createJwtRefreshToken = (administrator) => jsonwebtoken_1.default.sign({ username: administrator }, 'a97a6109f424c526929b5ea4d2a9d17bf36ff15f5f7a610df6f0cad5fdaa58d670a184287054620245017ce1ff5f22c79ee21ef016e6b586e62e6ace5aa73040', { expiresIn: '1d' });
exports.createJwtRefreshToken = createJwtRefreshToken;
