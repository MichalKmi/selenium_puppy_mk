"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("selenium-webdriver"), Builder = _a.Builder, By = _a.By, Key = _a.Key, until = _a.until;
var _b = require("@cucumber/cucumber"), Given = _b.Given, When = _b.When, Then = _b.Then;
var assert = require('assert');
var driver;
driver = new Builder().forBrowser("chrome").build();
var baseUrl = 'https://spartantest-puppies.herokuapp.com/';
Given('I navigate to the puppy adoption site', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.get(baseUrl)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
When('I view details for the puppy named {string}', function (puppyName) {
    return __awaiter(this, void 0, void 0, function () {
        var puppyDetailsButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.wait(until.urlContains('puppies'), 2000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(By.xpath("//h3[text()='".concat(puppyName, "']/parent::*/following-sibling::div/form/input[@value='View Details']")))];
                case 2:
                    puppyDetailsButton = _a.sent();
                    puppyDetailsButton.click();
                    return [2 /*return*/];
            }
        });
    });
});
Then('I return to the puppy list', function () {
    return __awaiter(this, void 0, void 0, function () {
        var currentUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.getCurrentUrl()];
                case 1:
                    currentUrl = _a.sent();
                    if (!(currentUrl !== baseUrl)) return [3 /*break*/, 3];
                    return [4 /*yield*/, driver.navigate().back()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
Then('I should be on the puppy list page', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.wait(until.urlIs(baseUrl), 2000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, driver.findElement(By.css("div > h2")).getText().then(function (text) {
                            assert.equal(text, "Puppy List");
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
Then('I should see {string} on the {int} page', function (puppyName, pageNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var elements, texts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElements(By.css("div > h3"))];
                case 1:
                    elements = _a.sent();
                    return [4 /*yield*/, Promise.all(elements.map(function (element) { return element.getText(); }))];
                case 2:
                    texts = _a.sent();
                    assert.ok(texts.includes(puppyName), "Could not find element with text: ".concat(puppyName));
                    return [2 /*return*/];
            }
        });
    });
});
Then('the adoption fee should be {string}', function (adoptionFee) {
    return __awaiter(this, void 0, void 0, function () {
        var feesElement, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.css("[class='fees']"))];
                case 1:
                    feesElement = _a.sent();
                    return [4 /*yield*/, feesElement.getText()];
                case 2:
                    text = _a.sent();
                    if (!text.includes(adoptionFee)) {
                        throw new Error("Expected adoption fee \"".concat(adoptionFee, "\" not found in \"").concat(text, "\""));
                    }
                    return [2 /*return*/];
            }
        });
    });
});
When('I go to the {int} page', function (toPageNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var currentPageNumber, nextPageButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getCurrentPageNumber()];
                case 1:
                    currentPageNumber = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(currentPageNumber !== toPageNumber)) return [3 /*break*/, 6];
                    return [4 /*yield*/, driver.findElement(By.css("#content > div.pagination > a.".concat(toPageNumber > currentPageNumber ? 'next' : 'previous', "_page")))];
                case 3:
                    nextPageButton = _a.sent();
                    return [4 /*yield*/, nextPageButton.click()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, getCurrentPageNumber()];
                case 5:
                    currentPageNumber = _a.sent();
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
});
function getCurrentPageNumber() {
    return __awaiter(this, void 0, void 0, function () {
        var currentUrl, match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.getCurrentUrl()];
                case 1:
                    currentUrl = _a.sent();
                    match = currentUrl.match(/page=(\d+)/);
                    return [2 /*return*/, match ? parseInt(match[1]) : 1];
            }
        });
    });
}
When('I click the {string} button', function (buttonText) {
    return __awaiter(this, void 0, void 0, function () {
        var button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.xpath("//input[@value='".concat(buttonText, "']")))];
                case 1:
                    button = _a.sent();
                    return [4 /*yield*/, button.click()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
When('I adopt the puppy named {string}', function (puppyName) {
    return __awaiter(this, void 0, void 0, function () {
        var button;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.xpath("//input[@value='".concat(puppyName, "']")))];
                case 1:
                    button = _a.sent();
                    return [4 /*yield*/, button.click()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
Then('On the list to adoption there is {string}', function (puppyName) {
    return __awaiter(this, void 0, void 0, function () {
        var puppyNameHeader, isHeaderVisible;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.xpath("//h2[text()='".concat(puppyName, ":']")))];
                case 1:
                    puppyNameHeader = _a.sent();
                    return [4 /*yield*/, puppyNameHeader.isDisplayed()];
                case 2:
                    isHeaderVisible = _a.sent();
                    assert.strictEqual(isHeaderVisible, true, "Header with puppy name \"".concat(puppyName, ":\" is not visible."));
                    return [2 /*return*/];
            }
        });
    });
});
When('I complete the adoption process with a credit card', function () {
    return __awaiter(this, void 0, void 0, function () {
        var orderName, orderAddress, orderEmail, orderPayType;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.id("order_name"))];
                case 1:
                    orderName = _a.sent();
                    return [4 /*yield*/, driver.findElement(By.id("order_address"))];
                case 2:
                    orderAddress = _a.sent();
                    return [4 /*yield*/, driver.findElement(By.id("order_email"))];
                case 3:
                    orderEmail = _a.sent();
                    return [4 /*yield*/, driver.findElement(By.id("order_pay_type"))];
                case 4:
                    orderPayType = _a.sent();
                    return [4 /*yield*/, orderName.sendKeys("John Doe")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, orderAddress.sendKeys("123 Main Street")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, orderEmail.sendKeys("john@example.com")];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, orderPayType.sendKeys("Credit card", Key.RETURN)];
                case 8:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
When("I add a {string} for {string}", function (addElement, pet) {
    return __awaiter(this, void 0, void 0, function () {
        var elementId, elementToClick;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    switch (addElement) {
                        case "Collar & Leash":
                            elementId = "collar";
                            break;
                        case "Chew Toy":
                            elementId = "toy";
                            break;
                        case "Travel Carrier":
                            elementId = "carrier";
                            break;
                        case "First Vet Visit":
                            elementId = "vet";
                            break;
                        default:
                            throw new Error("Invalid addElement: ".concat(addElement));
                    }
                    return [4 /*yield*/, driver.findElement(By.xpath("//h2[contains(text(), '".concat(pet, ":')]/following::tr//input[@id='").concat(elementId, "']")))];
                case 1:
                    elementToClick = _a.sent();
                    return [4 /*yield*/, elementToClick.click()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
Then('I should see a confirmation message for the adoption', function () {
    return __awaiter(this, void 0, void 0, function () {
        var confirmationMessage, expectedMessage, messageText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, driver.findElement(By.id("notice"))];
                case 1:
                    confirmationMessage = _a.sent();
                    expectedMessage = "Thank you for adopting a puppy!";
                    return [4 /*yield*/, confirmationMessage.getText()];
                case 2:
                    messageText = _a.sent();
                    if (!messageText.includes(expectedMessage)) {
                        throw new Error("Expected adoption fee \"".concat(expectedMessage, "\" not found in \"").concat(confirmationMessage, "\""));
                    }
                    return [2 /*return*/];
            }
        });
    });
});
