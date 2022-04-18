"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.logEvents = void 0;
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const promises_1 = require("fs/promises");
const logEvents = async (message, logName) => {
    const dateTime = `${(0, date_fns_1.format)(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${(0, uuid_1.v4)()}\t${message}\n`;
    try {
        if (!(0, fs_1.existsSync)(path_1.default.join(__dirname, '..', 'logs'))) {
            (0, promises_1.mkdir)(path_1.default.join(__dirname, '..', 'logs'));
        }
        await (0, promises_1.appendFile)(path_1.default.join(__dirname, '..', 'logs', logName), logItem);
    }
    catch (err) {
        console.log(err);
    }
};
exports.logEvents = logEvents;
const logger = (req, _res, next) => {
    (0, exports.logEvents)(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};
exports.logger = logger;
