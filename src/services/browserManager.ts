import puppeteer, { Browser } from 'puppeteer';

// We dynamically import these only when needed to avoid issues locally if they aren't fully supported
let chromium: any;
let puppeteerCore: any;

export class BrowserManager {
  private static instance: Browser | any | null = null;

  public static async getBrowser(): Promise<Browser | any> {
    if (!this.instance) {
      if (process.env.VERCEL || process.env.AWS_REGION) {
        // Running on Vercel or AWS Lambda
        if (!chromium) chromium = (await import('@sparticuz/chromium')).default;
        if (!puppeteerCore) puppeteerCore = (await import('puppeteer-core')).default;

        this.instance = await puppeteerCore.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
      } else {
        // Running locally
        this.instance = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
      }
    }
    return this.instance;
  }
}
