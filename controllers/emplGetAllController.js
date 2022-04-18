"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employees_json_1 = __importDefault(require("../model/employees.json"));
const emplDB = {
    empls: employees_json_1.default,
    setEmpls: function (data) {
        this.empls = data;
    }
};
const handleGetAllEmpl = (_req, res) => {
    try {
        res.json(emplDB.empls);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.default = handleGetAllEmpl;
