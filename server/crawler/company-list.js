const puppeteer = require('puppeteer');

const sleep = time => new Promise((resolve) => {
  setTimeout(resolve, time);
});

async function fetchCompanyList(page) {
  const url = `https://www.zhipin.com/gongsi/_zzz_c101010100/`;
  console.log(999999);
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log(666666);
  // await page.screenshot({
  //   path: `/site/screenshot/company.png`,
  //   // fullPage: true,
  // });
  console.log(77777);
  return page.evaluate(() => {
    let $ = window.$;
    let items = $('.sub-li');
    let objItem = [];

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item);
        let id = it.find('.company-info').attr('href');
        let company = it.find('.conpany-text h4').text();
        let logo = it.find('.company-info img').attr('src');
        let info = it.find('.conpany-text p').text();
        let hot = it.find('.about-info p').text();

        objItem.push({
          id,
          company,
          logo,
          info,
          hot
        });
      });
    }

    return objItem;
  });
}


(async () => {
  console.log('正在抓取公司列表页面');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  });
  console.log(1);
  const page = await browser.newPage();
  console.log(2);
  await sleep(2000);
  console.log(11111);
  let result = await fetchCompanyList(page);
  console.log(22222);
  process.send({ result });
  console.log(3);
  await sleep(5000);
  console.log(4);
  browser.close();
  process.exit(0);

})();
