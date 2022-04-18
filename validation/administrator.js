"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class AdministratorValidator {
    checkAuthAdministrator() {
        return [
            (0, express_validator_1.body)('adminUsername').notEmpty().withMessage('Username value should not be empty'),
            (0, express_validator_1.body)('adminPassword').notEmpty().withMessage('Password value should not be empty')
        ];
    }
}
exports.default = new AdministratorValidator();
