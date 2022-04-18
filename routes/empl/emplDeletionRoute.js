"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emplDeletionController_1 = __importDefault(require("../../controllers/emplDeletionController"));
const router = express_1.default.Router();
router.delete('/delete', emplDeletionController_1.default);
exports.default = router;
