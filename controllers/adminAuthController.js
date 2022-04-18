"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenManager_1 = require("../services/tokenManager");
const administrators_json_1 = __importDefault(require("../model/administrators.json"));
const path_1 = __importDefault(require("path"));
const adminDB = {
    admins: administrators_json_1.default,
    setAdmins: function (data) {
        this.admins = data;
    }
};
const handleAdminAuthentication = async (req, res) => {
    const cookies = req?.cookies;
    const { adminUsername, adminPassword } = req.body;
    const foundAdmin = adminDB.admins.find(admin => admin.username === adminUsername);
    if (!foundAdmin)
        return res.sendStatus(401);
    const match = await bcrypt_1.default.compare(adminPassword, foundAdmin.password);
    if (match) {
        const accessToken = (0, tokenManager_1.createJwtAccessToken)(foundAdmin.username);
        const newRefreshToken = (0, tokenManager_1.createJwtRefreshToken)(foundAdmin.username);
        let newRefreshTokenArray = !cookies?.jwt
            ? foundAdmin.refreshToken
            : foundAdmin.refreshToken.filter(token => token !== cookies.jwt);
        if (cookies?.jwt) {
            const refreshToken = cookies.jwt;
            const foundToken = foundAdmin.refreshToken.find(admin => admin.includes(refreshToken));
            if (!foundToken) {
                newRefreshTokenArray = [];
            }
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        }
        const refreshTokenArray = [...newRefreshTokenArray, newRefreshToken];
        const authenticatedAdmin = {
            ...foundAdmin,
            refreshToken: refreshTokenArray
        };
        const otherAdmin = adminDB.admins.filter(admin => admin.email !== foundAdmin.email);
        if (adminDB.admins.length <= 1) {
            adminDB.setAdmins(authenticatedAdmin);
        }
        else {
            const allAdmin = [...otherAdmin, authenticatedAdmin];
            adminDB.setAdmins(allAdmin);
        }
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json(accessToken);
    }
    else {
        res.sendStatus(401);
    }
    await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'administrators.json'), JSON.stringify(adminDB.admins));
};
exports.default = handleAdminAuthentication;
