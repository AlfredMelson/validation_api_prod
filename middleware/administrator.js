"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employees_1 = require("../model/employees");
const items = [];
const administrator = () => {
    return employees_1.employees.map((userItem) => {
        const updatedItem = items.find(({ id }) => id === userItem.id);
        return {
            ...(updatedItem || userItem)
        };
    });
};
exports.default = administrator;
