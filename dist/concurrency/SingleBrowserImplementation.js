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
const ConcurrencyImplementation_1 = require("./ConcurrencyImplementation");
const util_1 = require("../util");
const debug = (0, util_1.debugGenerator)('SingleBrowserImpl');
const BROWSER_TIMEOUT = 5000;
class SingleBrowserImplementation extends ConcurrencyImplementation_1.default {
    constructor(options, puppeteer, concurrencyOptions = {}) {
        super(options, puppeteer, concurrencyOptions);
        this.browser = null;
        this.repairing = false;
        this.repairRequested = false;
        this.openInstances = 0;
        this.waitingForRepairResolvers = [];
    }
    repair() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.openInstances !== 0 || this.repairing) {
                // already repairing or there are still pages open? wait for start/finish
                yield new Promise(resolve => this.waitingForRepairResolvers.push(resolve));
                return;
            }
            this.repairing = true;
            debug('Starting repair');
            try {
                // will probably fail, but just in case the repair was not necessary
                yield this.browser.close();
            }
            catch (e) {
                debug('Unable to close browser.');
            }
            try {
                this.browser = (yield this.puppeteer.launch(this.options));
            }
            catch (err) {
                throw new Error('Unable to restart chrome.');
            }
            this.repairRequested = false;
            this.repairing = false;
            this.waitingForRepairResolvers.forEach(resolve => resolve());
            this.waitingForRepairResolvers = [];
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield this.puppeteer.launch(this.options);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
        });
    }
    workerInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            let resources;
            return {
                jobInstance: () => __awaiter(this, void 0, void 0, function* () {
                    if (this.repairRequested) {
                        yield this.repair();
                    }
                    yield (0, util_1.timeoutExecute)(BROWSER_TIMEOUT, (() => __awaiter(this, void 0, void 0, function* () {
                        resources = yield this.createResources();
                    }))());
                    this.openInstances += 1;
                    return {
                        resources,
                        close: () => __awaiter(this, void 0, void 0, function* () {
                            this.openInstances -= 1; // decrement first in case of error
                            yield (0, util_1.timeoutExecute)(BROWSER_TIMEOUT, this.freeResources(resources));
                            if (this.repairRequested) {
                                yield this.repair();
                            }
                        }),
                    };
                }),
                close: () => __awaiter(this, void 0, void 0, function* () { }),
                repair: () => __awaiter(this, void 0, void 0, function* () {
                    debug('Repair requested');
                    this.repairRequested = true;
                    yield this.repair();
                }),
            };
        });
    }
}
exports.default = SingleBrowserImplementation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlQnJvd3NlckltcGxlbWVudGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmN1cnJlbmN5L1NpbmdsZUJyb3dzZXJJbXBsZW1lbnRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBLDJFQUFzRjtBQUV0RixrQ0FBeUQ7QUFDekQsTUFBTSxLQUFLLEdBQUcsSUFBQSxxQkFBYyxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFbEQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBRTdCLE1BQThCLDJCQUE0QixTQUFRLG1DQUF5QjtJQVN2RixZQUNJLE9BQWdDLEVBQ2hDLFNBQWMsRUFDZCxxQkFBeUQsRUFBRTtRQUUzRCxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBWnhDLFlBQU8sR0FBNkIsSUFBSSxDQUFDO1FBRTNDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0Isb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsOEJBQXlCLEdBQW1CLEVBQUUsQ0FBQztJQVF2RCxDQUFDO0lBRWEsTUFBTTs7WUFDaEIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUM1Qyx5RUFBeUU7Z0JBQ3pFLE1BQU0sSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRXpCLElBQUk7Z0JBQ0Esb0VBQW9FO2dCQUNwRSxNQUEwQixJQUFJLENBQUMsT0FBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ25EO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDckM7WUFFRCxJQUFJO2dCQUNBLElBQUksQ0FBQyxPQUFPLElBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFzQixDQUFBLENBQUM7YUFDakY7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7YUFDaEQ7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMseUJBQXlCLEdBQUcsRUFBRSxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVZLElBQUk7O1lBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxDQUFDO0tBQUE7SUFFWSxLQUFLOztZQUNkLE1BQU8sSUFBSSxDQUFDLE9BQTZCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBTVksY0FBYzs7WUFDdkIsSUFBSSxTQUF1QixDQUFDO1lBRTVCLE9BQU87Z0JBQ0gsV0FBVyxFQUFFLEdBQVMsRUFBRTtvQkFDcEIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO3dCQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDdkI7b0JBRUQsTUFBTSxJQUFBLHFCQUFjLEVBQUMsZUFBZSxFQUFFLENBQUMsR0FBUyxFQUFFO3dCQUM5QyxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzdDLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO29CQUV4QixPQUFPO3dCQUNILFNBQVM7d0JBRVQsS0FBSyxFQUFFLEdBQVMsRUFBRTs0QkFDZCxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQyxDQUFDLG1DQUFtQzs0QkFDNUQsTUFBTSxJQUFBLHFCQUFjLEVBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs0QkFFckUsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dDQUN0QixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzs2QkFDdkI7d0JBQ0wsQ0FBQyxDQUFBO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQyxDQUFBO2dCQUVELEtBQUssRUFBRSxHQUFTLEVBQUUsZ0RBQUUsQ0FBQyxDQUFBO2dCQUVyQixNQUFNLEVBQUUsR0FBUyxFQUFFO29CQUNmLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQTthQUNKLENBQUM7UUFDTixDQUFDO0tBQUE7Q0FDSjtBQTlGRCw4Q0E4RkMifQ==