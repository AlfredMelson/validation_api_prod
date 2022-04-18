"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const employees_json_1 = __importDefault(require("../model/employees.json"));
const emplDB = {
    empls: employees_json_1.default,
    setEmpls: function (data) {
        this.empls = data;
    }
};
const handleEmplDeletion = async (req, res) => {
    const { emplFirstname, emplLastname, emplEmail } = req.body;
    const foundEmpl = emplDB.empls.find((empl) => empl.email === emplEmail);
    if (!foundEmpl)
        return res.sendStatus(401);
    try {
        const otherEmpls = emplDB.empls.filter((empl) => empl.email !== emplEmail);
        emplDB.setEmpls([...otherEmpls]);
        await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(emplDB.empls));
        res.status(201).json({ success: `${emplFirstname} ${emplLastname} has been deleted.` });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.default = handleEmplDeletion;
