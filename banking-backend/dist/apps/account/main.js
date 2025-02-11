/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(6);
const account_entity_1 = __webpack_require__(7);
const account_service_1 = __webpack_require__(9);
const account_controller_1 = __webpack_require__(10);
const passport_1 = __webpack_require__(11);
const microservices_1 = __webpack_require__(2);
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'test',
                database: 'account',
                autoLoadEntities: true,
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'your_secret_key',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [account_service_1.AccountService, {
                provide: 'ACCOUNT_SERVICE',
                useFactory: () => ({
                    transport: microservices_1.Transport.GRPC,
                    options: {
                        package: 'account',
                        protoPath: 'src/proto/account.proto',
                        url: 'localhost:5001',
                    },
                }),
            },],
        controllers: [account_controller_1.AccountController],
        exports: [account_service_1.AccountService],
    })
], AccountModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Account = void 0;
const typeorm_1 = __webpack_require__(8);
let Account = class Account {
};
exports.Account = Account;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Account.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Account.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Account.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Active' }),
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const account_entity_1 = __webpack_require__(7);
let AccountService = class AccountService {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    async createAccount(userId, accountNumber) {
        const existingAccount = await this.accountRepository.findOne({ where: { accountNumber } });
        if (existingAccount) {
            throw new common_1.BadRequestException('Account number already exists');
        }
        const newAccount = this.accountRepository.create({
            userId,
            accountNumber,
            balance: 0,
        });
        return await this.accountRepository.save(newAccount);
    }
    async getAccountByIdGrpc(id) {
        console.log(`🔍 Fetching account with ID: ${id}`);
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }
    async getAccountById(id) {
        const account = await this.accountRepository.findOne({ where: { id } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async getAccountByNumber(accountNumber) {
        const account = await this.accountRepository.findOne({ where: { accountNumber } });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async getAccountsByUserId(userId) {
        console.log("inside service", userId);
        return await this.accountRepository.find({ where: { userId } });
    }
    async updateAccountStatus(accountNumber, status) {
        const account = await this.getAccountByNumber(accountNumber);
        account.status = status;
        return await this.accountRepository.save(account);
    }
    async updateAccountBalance(id, balance) {
        const account = await this.getAccountById(id);
        account.balance = balance;
        return await this.accountRepository.save(account);
    }
    async updateAccountBalanceGrpc(id, amount, type) {
        const account = await this.getAccountById(id);
        if (type == "credit") {
            account.balance = account.balance + amount;
        }
        else {
            account.balance = account.balance - amount;
        }
        return await this.accountRepository.save(account);
    }
    async deleteAccount(accountNumber) {
        const account = await this.getAccountByNumber(accountNumber);
        await this.accountRepository.remove(account);
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AccountService);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountController = void 0;
const common_1 = __webpack_require__(4);
const account_service_1 = __webpack_require__(9);
const microservices_1 = __webpack_require__(2);
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async createAccount(body) {
        return await this.accountService.createAccount(body.userId, body.accountNumber);
    }
    async getAccountById(id) {
        return await this.accountService.getAccountById(id);
    }
    async getAccountByIdGrpc(id) {
        return await this.accountService.getAccountByIdGrpc(id);
    }
    async getAccountByNumber(accountNumber) {
        return await this.accountService.getAccountByNumber(accountNumber);
    }
    async getAccountsByUserId(body) {
        console.log("inside controller", body.userId);
        return await this.accountService.getAccountsByUserId(body.userId);
    }
    async updateAccountStatus(body) {
        return await this.accountService.updateAccountStatus(body.accountNumber, body.status);
    }
    async updateAccountBalanceGrpc(body) {
        return await this.accountService.updateAccountBalanceGrpc(body.accountId, body.amount, body.type);
    }
    async deleteAccount(body) {
        await this.accountService.deleteAccount(body.accountNumber);
        return { message: 'Account deleted successfully' };
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AccountController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AccountController.prototype, "getAccountById", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AccountService', 'GetAccountByIdGrpc'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AccountController.prototype, "getAccountByIdGrpc", null);
__decorate([
    (0, common_1.Get)('number/:accountNumber'),
    __param(0, (0, common_1.Param)('accountNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AccountController.prototype, "getAccountByNumber", null);
__decorate([
    (0, common_1.Post)('userId'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AccountController.prototype, "getAccountsByUserId", null);
__decorate([
    (0, common_1.Post)('status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AccountController.prototype, "updateAccountStatus", null);
__decorate([
    (0, microservices_1.GrpcMethod)('AccountService', 'updateAccountBalanceGrpc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AccountController.prototype, "updateAccountBalanceGrpc", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AccountController.prototype, "deleteAccount", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('accounts'),
    __metadata("design:paramtypes", [typeof (_a = typeof account_service_1.AccountService !== "undefined" && account_service_1.AccountService) === "function" ? _a : Object])
], AccountController);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("cors");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const microservices_1 = __webpack_require__(2);
const account_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(account_module_1.AccountModule);
    const cors = __webpack_require__(12);
    app.use(cors());
    app.enableCors({
        origin: 'http://localhost:3006',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(8081);
    const grpcApp = await core_1.NestFactory.createMicroservice(account_module_1.AccountModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'account',
            protoPath: './proto/account.proto',
            url: 'localhost:5001'
        },
    });
    await grpcApp.listen();
}
bootstrap();

})();

/******/ })()
;