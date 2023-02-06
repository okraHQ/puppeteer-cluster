import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';
export default class Page extends SingleBrowserImplementation {
    private page;
    protected createResources(): Promise<ResourceData>;
    protected freeResources(resources: ResourceData): Promise<void>;
}
