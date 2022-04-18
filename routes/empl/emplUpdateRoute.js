"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emplUpdateController_1 = __importDefault(require("../../controllers/emplUpdateController"));
const router = express_1.default.Router();
router.post('/update', emplUpdateController_1.default);
exports.default = router;
