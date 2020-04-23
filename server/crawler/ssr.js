const puppeteer = require('puppeteer');

async function ssr(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  console.log(1);
  await page.goto(url, { waitUntil: 'networkidle0' });
  console.log(2);
  const html = await page.content();
  console.log(3);
  return html;
}

(async () => {
  let result = await ssr('https://www.zhipin.com/gongsi/?ka=header_brand');
  console.log(result);
})();
