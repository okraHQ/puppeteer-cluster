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
Object.defineProperty(exports, "__esModule", { value: true });
const SingleBrowserImplementation_1 = require("../SingleBrowserImplementation");
class Page extends SingleBrowserImplementation_1.default {
    constructor() {
        super(...arguments);
        this.page = null;
    }
    createResources() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.concurrencyOptions.holdPageConcurrency) {
                if (this.page)
                    return { page: this.page };
                this.page = yield this.browser.newPage();
                return { page: this.page };
            }
            return { page: yield this.browser.newPage(), };
        });
    }
    freeResources(resources) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.concurrencyOptions.holdPageConcurrency) {
                yield resources.page.close();
            }
        });
    }
}
exports.default = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb25jdXJyZW5jeS9idWlsdC1pbi9QYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsZ0ZBQXlFO0FBRXpFLE1BQXFCLElBQUssU0FBUSxxQ0FBMkI7SUFBN0Q7O1FBQ1ksU0FBSSxHQUEwQixJQUFJLENBQUM7SUFrQi9DLENBQUM7SUFoQm1CLGVBQWU7O1lBQzNCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFO2dCQUM3QyxJQUFJLElBQUksQ0FBQyxJQUFJO29CQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU8sSUFBSSxDQUFDLE9BQTZCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzlCO1lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFPLElBQUksQ0FBQyxPQUE2QixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7UUFDMUUsQ0FBQztLQUFBO0lBRWUsYUFBYSxDQUFDLFNBQXVCOztZQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFO2dCQUM5QyxNQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEM7UUFDTCxDQUFDO0tBQUE7Q0FFSjtBQW5CRCx1QkFtQkMifQ==