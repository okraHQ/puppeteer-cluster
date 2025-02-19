
import * as puppeteer from 'puppeteer';

import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';

export default class Page extends SingleBrowserImplementation {
    private page: puppeteer.Page | null = null;

    protected async createResources(): Promise<ResourceData> {
        if (this.concurrencyOptions.reusePage) {
            if (this.page) return { page: this.page };
            this.page = await (this.browser as puppeteer.Browser).newPage();
            return { page: this.page };
        }

        return { page: await (this.browser as puppeteer.Browser).newPage(), };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.page.close();
        this.page = null;
    }

}
