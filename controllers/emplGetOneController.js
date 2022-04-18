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
const handleGetEmpl = async (req, res) => {
    const { emplId } = req.body;
    const foundEmpl = emplDB.empls.find(empl => empl.id === emplId);
    if (!foundEmpl)
        return res.sendStatus(401);
    res.json(foundEmpl);
};
exports.default = handleGetEmpl;
