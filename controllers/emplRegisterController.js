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
const handleEmplRegistration = async (req, res) => {
    const { emplFirstname, emplLastname, emplRole, emplEmail } = req.body;
    const duplicateFirstname = emplDB.empls.find(empl => empl.firstname === emplFirstname);
    const duplicateLastname = emplDB.empls.find(empl => empl.lastname === emplLastname);
    const duplicateName = duplicateFirstname || duplicateLastname;
    const duplicateEmail = emplDB.empls.find(empl => empl.email === emplEmail);
    if (duplicateName || duplicateEmail)
        return res.sendStatus(409);
    try {
        const emplDBLength = Math.floor(emplDB.empls.length);
        const emplId = JSON.stringify(emplDBLength > 0 ? emplDBLength + 1 : 1);
        const creationDate = new Date().toISOString();
        const newEmpl = {
            id: emplId,
            firstname: emplFirstname,
            lastname: emplLastname,
            role: emplRole,
            email: emplEmail,
            createdAt: creationDate
        };
        emplDB.setEmpls([...emplDB.empls, newEmpl]);
        await promises_1.default.writeFile(path_1.default.join(__dirname, '..', 'model', 'employees.json'), JSON.stringify(emplDB.empls));
        res.status(201).json({ success: `${emplFirstname} ${emplLastname} has been created.` });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.default = handleEmplRegistration;
