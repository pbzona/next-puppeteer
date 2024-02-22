import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(req: Request, res: Response) {
  let errorMessage = 'Server error, please try again';

  try {
    const data = await req.json();
    const siteUrl = new URL(data.url);

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(
        'https://notetoselfdeletethislater.s3.us-west-1.amazonaws.com/chromium-v122.0.0-pack.tar'
      ),
    });

    const page = await browser.newPage();
    await page.goto(siteUrl.toString());

    const pageTitle = await page.title();
    const metrics = await page.metrics();
    await browser.close();

    return Response.json({
      title: pageTitle,
      metrics,
      siteUrl,
    });
  } catch (err) {
    // Main reason this would happen is if the URL constructor throws due to an invalid URL param in the request body
    if (err instanceof TypeError) {
      errorMessage = 'Not a valid URL';
    }

    console.error(err);

    return Response.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
