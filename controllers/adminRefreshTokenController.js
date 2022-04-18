"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const administrators_json_1 = __importDefault(require("../model/administrators.json"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const tokenManager_1 = require("../services/tokenManager");
const adminDB = {
    admins: administrators_json_1.default,
    setAdmins: function (data) {
        this.admins = data;
    }
};
const handleAdminRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    console.log(`cookie available at refresh: ${JSON.stringify(cookies)}`);
    if (!cookies?.jwt)
        return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    const foundAdmin = adminDB.admins.find(admin => admin.refreshToken === refreshToken);
    if (!foundAdmin) {
        jsonwebtoken_1.default.verify(refreshToken, 'a97a6109f424c526929b5ea4d2a9d17bf36ff15f5f7a610df6f0cad5fdaa58d670a184287054620245017ce1ff5f22c79ee21ef016e6b586e62e6ace5aa73040', async (error, decoded) => {
            if (error)
                return res.sendStatus(403);
            const adminHacked = adminDB.admins.find(admin => admin.username === decoded.username);
            const hackedAdminRefreshTokenArray = [];
            if (adminHacked) {
                const hackedAdmin = {
                    ...adminHacked,
                    refreshToken: hackedAdminRefreshTokenArray
                };
                const otherAdmin = adminDB.admins.filter(admin => admin.email !== adminHacked.email);
                if (adminDB.admins.length <= 1) {
                    adminDB.setAdmins(hackedAdmin);
                }
                else {
                    const allAdmin = [...otherAdmin, hackedAdmin];
                    adminDB.setAdmins(allAdmin);
                }
            }
        });
        return res.sendStatus(403);
    }
    const newRefreshTokenArray = foundAdmin.refreshToken.filter(admin => admin !== refreshToken);
    console.log('newRefreshTokenArray', newRefreshTokenArray);
    jsonwebtoken_1.default.verify(refreshToken, 'a97a6109f424c526929b5ea4d2a9d17bf36ff15f5f7a610df6f0cad5fdaa58d670a184287054620245017ce1ff5f22c79ee21ef016e6b586e62e6ace5aa73040', async (error, decoded) => {
        if (error) {
            const updatedfoundAdmin = {
                ...foundAdmin,
                refreshToken: [...newRefreshTokenArray]
            };
            const otherAdmin = adminDB.admins.filter(admin => admin.id !== foundAdmin.id);
            if (adminDB.admins.length <= 1) {
                adminDB.setAdmins(updatedfoundAdmin);
            }
            else {
                const allAdmin = [...otherAdmin, updatedfoundAdmin];
                adminDB.setAdmins(allAdmin);
            }
        }
        if (error || foundAdmin.username !== decoded.username)
            return res.sendStatus(403);
        const accessToken = (0, tokenManager_1.createJwtAccessToken)(decoded.username);
        const newRefreshToken = (0, tokenManager_1.createJwtRefreshToken)(foundAdmin.username);
        const loggedInAdmin = {
            ...foundAdmin,
            refreshToken: [...newRefreshTokenArray, newRefreshToken]
        };
        const otherAdmin = adminDB.admins.filter(admin => admin.username !== foundAdmin.username);
        if (adminDB.admins.length <= 1) {
            adminDB.setAdmins(loggedInAdmin);
        }
        else {
            const allAdmin = [...otherAdmin, loggedInAdmin];
            adminDB.setAdmins(allAdmin);
        }
        res.cookie('jwt', newRefreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json(accessToken);
        await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'administrators.json'), JSON.stringify(adminDB.admins));
    });
};
exports.default = handleAdminRefreshToken;
