"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const approvedOrigins_1 = __importDefault(require("./approvedOrigins"));
const corsOptions = {
    origin: (origin, callback) => {
        if (origin !== undefined) {
            if (approvedOrigins_1.default.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            }
            else {
                callback(new Error('Not approved by CORS'));
            }
        }
    },
    optionsSuccessStatus: 200
};
exports.default = corsOptions;
