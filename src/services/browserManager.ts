import puppeteer, { Browser } from 'puppeteer';

export class BrowserManager {
  private static instance: Browser | null = null;

  public static async getBrowser(): Promise<Browser> {
    if (!this.instance) {
      this.instance = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
    }
    return this.instance;
  }
}
