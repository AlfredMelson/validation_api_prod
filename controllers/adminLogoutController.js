"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const administrators_json_1 = __importDefault(require("../model/administrators.json"));
const path_1 = __importDefault(require("path"));
const adminDB = {
    admins: administrators_json_1.default,
    setAdmins: function (data) {
        this.admins = data;
    }
};
const handleAdminLogout = async (req, res) => {
    const cookies = req?.cookies;
    console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
    if (!cookies.jwt)
        return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const foundAdmin = adminDB.admins.find(admin => admin.refreshToken === refreshToken);
    if (!foundAdmin) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }
    const newRefreshTokenArray = foundAdmin.refreshToken.filter(admin => admin !== refreshToken);
    const loggedOutAdmin = {
        ...foundAdmin,
        refreshToken: newRefreshTokenArray
    };
    console.log('loggedOutAdmin', loggedOutAdmin);
    const otherAdmin = adminDB.admins.filter(admin => admin.id !== foundAdmin.id);
    if (adminDB.admins.length <= 1) {
        adminDB.setAdmins(loggedOutAdmin);
    }
    else {
        const allAdmin = [...otherAdmin, loggedOutAdmin];
        adminDB.setAdmins(allAdmin);
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.json(foundAdmin);
    res.sendStatus(204);
    await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'administrators.json'), JSON.stringify(adminDB.admins));
};
exports.default = handleAdminLogout;
