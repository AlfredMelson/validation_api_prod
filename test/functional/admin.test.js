"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('GET /admin/logout', () => {
    it('should return 200 OK', () => {
        return (0, supertest_1.default)(app_1.default).get('/admin/logout').expect(200);
    });
});
describe('GET /admin/auth', () => {
    it('should return 200 OK', () => {
        return (0, supertest_1.default)(app_1.default).get('/admin/auth').expect(200);
    });
});
describe('GET /admin/register', () => {
    it('should return 200 OK', done => {
        (0, supertest_1.default)(app_1.default)
            .get('/admin/register')
            .expect(200)
            .end(() => done());
    });
});
describe('GET /admin/refresh', () => {
    it('should return 302 Found for redirection', done => {
        (0, supertest_1.default)(app_1.default)
            .get('/admin/refresh')
            .expect(302)
            .end(() => done());
    });
});
