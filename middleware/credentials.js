"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const approvedOrigins_1 = __importDefault(require("../config/approvedOrigins"));
const credentials = (req, res, next) => {
    const requestOrigin = req.headers.origin;
    if (requestOrigin) {
        if (approvedOrigins_1.default.includes(requestOrigin)) {
            res.header('Access-Control-Allow-Origin', 'https://validate.hmtgp.com');
            res.header('Access-Control-Allow-Credentials', 'true');
        }
    }
    next();
};
exports.default = credentials;
