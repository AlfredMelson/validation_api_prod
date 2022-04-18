"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRefreshTokenController_1 = __importDefault(require("../../controllers/adminRefreshTokenController"));
const router = express_1.default.Router();
router.get('/refresh', adminRefreshTokenController_1.default);
exports.default = router;
