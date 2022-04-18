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
const handleEmployeeUpdate = async (req, res) => {
    const { emplId, emplFirstname, emplLastname, emplRole, emplEmail } = req.body;
    const foundEmpl = emplDB.empls.find(empl => empl.id === emplId);
    if (!foundEmpl)
        return res.sendStatus(401);
    try {
        const otherEmpls = emplDB.empls.filter(empl => empl.id !== emplId);
        const updatedDate = new Date().toISOString();
        const updatedEmpl = {
            id: emplId,
            firstname: emplFirstname,
            lastname: emplLastname,
            role: emplRole,
            email: emplEmail,
            createdAt: updatedDate
        };
        emplDB.setEmpls([...otherEmpls, updatedEmpl]);
        await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(emplDB.empls));
        res.status(201).json({ success: `${emplFirstname} ${emplLastname} has been updated.` });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.default = handleEmployeeUpdate;
