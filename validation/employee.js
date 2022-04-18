"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class EmployeeValidator {
    checkCreateEmployee() {
        return [
            (0, express_validator_1.body)('emplName').notEmpty().withMessage('Name value should not be empty'),
            (0, express_validator_1.body)('emplRole').notEmpty().withMessage('Role value should not be empty'),
            (0, express_validator_1.body)('emplEmail').notEmpty().withMessage('Email value should not be empty')
        ];
    }
    checkReadEmployee() {
        return [
            (0, express_validator_1.query)('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The limit value should be number and between 1-10'),
            (0, express_validator_1.query)('offset').optional().isNumeric().withMessage('The value should be number')
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4')
        ];
    }
}
exports.default = new EmployeeValidator();
