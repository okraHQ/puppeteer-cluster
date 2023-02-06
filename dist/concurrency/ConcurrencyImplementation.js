"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ABSTRACT CLASS Needs to be implemented to manage one or more browsers via puppeteer instances
 *
 * The ConcurrencyImplementation creates WorkerInstances. Workers create JobInstances:
 * One WorkerInstance per maxWorkers, one JobInstance per job
 */
class ConcurrencyImplementation {
    /**
     * @param options  Options that should be provided to puppeteer.launch
     * @param puppeteer  puppeteer object (like puppeteer or puppeteer-core)
     */
    constructor(options, puppeteer, concurrencyOptions = {}) {
        this.options = options;
        this.puppeteer = puppeteer;
        this.concurrencyOptions = concurrencyOptions;
    }
}
exports.default = ConcurrencyImplementation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uY3VycmVuY3lJbXBsZW1lbnRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25jdXJyZW5jeS9Db25jdXJyZW5jeUltcGxlbWVudGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0E7Ozs7O0dBS0c7QUFDSCxNQUE4Qix5QkFBeUI7SUFNbkQ7OztPQUdHO0lBQ0gsWUFDSSxPQUFzQixFQUN0QixTQUFjLEVBQ2QscUJBQXlELEVBQUU7UUFFM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQ2pELENBQUM7Q0FrQko7QUFwQ0QsNENBb0NDIn0=