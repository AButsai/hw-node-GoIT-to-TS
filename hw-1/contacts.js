var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var v4 = require('uuid').v4;
var fs = require('fs').promises;
var path = require('path');
var contactsPath = path.join(__dirname, './contacts.json');
var listContacts = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, allContacts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs.readFile(contactsPath, 'utf-8')];
            case 1:
                data = _a.sent();
                allContacts = JSON.parse(data);
                if (allContacts.length !== 0) {
                    return [2 /*return*/, allContacts];
                }
                return [2 /*return*/, null];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getContactById = function (contactId) { return __awaiter(_this, void 0, void 0, function () {
    var allContacts, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, listContacts()];
            case 1:
                allContacts = _a.sent();
                if ((allContacts === null || allContacts === void 0 ? void 0 : allContacts.length) !== 0 && allContacts) {
                    return [2 /*return*/, __spreadArray([], allContacts, true).filter(function (_a) {
                            var id = _a.id;
                            return id === contactId;
                        })];
                }
                return [2 /*return*/, null];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var removeContact = function (contactId) { return __awaiter(_this, void 0, void 0, function () {
    var allContacts, filterContact, updateContacts, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, listContacts()];
            case 1:
                allContacts = _a.sent();
                if (!((allContacts === null || allContacts === void 0 ? void 0 : allContacts.length) !== 0 && allContacts)) return [3 /*break*/, 3];
                filterContact = __spreadArray([], allContacts, true).filter(function (_a) {
                    var id = _a.id;
                    return id !== contactId;
                });
                updateContacts = JSON.stringify(filterContact);
                return [4 /*yield*/, fs.writeFile(contactsPath, updateContacts)];
            case 2:
                _a.sent();
                return [2 /*return*/, filterContact];
            case 3: return [2 /*return*/, null];
            case 4:
                error_3 = _a.sent();
                console.error(error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var addContact = function (name, email, phone) { return __awaiter(_this, void 0, void 0, function () {
    var id, allContacts, duplicateContact, updateContacts, updateContactsJSONStringify, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = v4();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, listContacts()];
            case 2:
                allContacts = _a.sent();
                duplicateContact = allContacts === null || allContacts === void 0 ? void 0 : allContacts.some(function (contact) { return contact.name === name || contact.email === email; });
                if (!((allContacts === null || allContacts === void 0 ? void 0 : allContacts.length) !== 0 && allContacts)) return [3 /*break*/, 4];
                if (duplicateContact) {
                    throw new Error('Contact exists');
                }
                updateContacts = __spreadArray(__spreadArray([], allContacts, true), [{ id: id, name: name, email: email, phone: phone }], false);
                updateContactsJSONStringify = JSON.stringify(updateContacts);
                return [4 /*yield*/, fs.writeFile(contactsPath, updateContactsJSONStringify)];
            case 3:
                _a.sent();
                return [2 /*return*/, updateContacts];
            case 4: return [2 /*return*/, null];
            case 5:
                error_4 = _a.sent();
                console.error(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
module.exports = {
    listContacts: listContacts,
    getContactById: getContactById,
    removeContact: removeContact,
    addContact: addContact,
};
