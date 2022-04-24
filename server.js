"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const admin_1 = require("./routes/admin");
const empl_1 = require("./routes/empl");
const employee_1 = require("./routes/employee");
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const path_1 = __importDefault(require("path"));
const logEvents_1 = require("./middleware/logEvents");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = require("./config/config");
const app = (0, express_1.default)();
app.use(logEvents_1.logger);
app.use(credentials_1.default);
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/employee', employee_1.employeeRouter);
app.use('/admin', admin_1.adminLogoutRoute);
app.use('/admin', admin_1.adminAuthRoute);
app.use('/admin', admin_1.adminRefreshRoute);
app.use('/api', empl_1.emplGetOneRoute);
app.use('/api', empl_1.emplGetAllRoute);
app.use('/api', empl_1.emplRegisterRoute);
app.use('/api', empl_1.emplUpdateRoute);
app.use('/api', empl_1.emplDeletionRoute);
app.use('/', (req, res) => {
    res.send('<h1>Validation API</h1> <h4>Message: Success</h4><p>Version: 1.0</p>');
});
app.use('/health', (req, res) => {
    res.send();
});
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    }
    else {
        res.type('txt').send('404 Not Found');
    }
});
app.use(errorHandler_1.default);
app.get('/', (_req, res) => res.send('validation api testing 1.2.3.'));
const server = app.listen(config_1.config.server.port, () => {
    console.log('Express server has been started on port ', config_1.config.server.port);
});
exports.default = server;
