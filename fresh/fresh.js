/**
 * @name Github
 *
 * @desc Logs into Github. Provide your username and password as environment variables when running the script, i.e:
 * `GITHUB_USER=myuser GITHUB_PWD=mypassword node github.js`
 *
 */
const puppeteer = require('puppeteer-extra')
const screenshot = 'fresh.png';
const userAgent = require('user-agents');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      })
    const page = await browser.newPage()
    await page.setUserAgent(userAgent.toString())
    //page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36')
    await page.goto('https://freshdirect.com/login/login.jsp',
    { waitUntil: 'networkidle2' })
    await page.waitFor('#email');
    await page.type('#email', 'user', {   delay: 100 });
    await page.type('#password', 'pass', { delay: 100 });
    await page.click('#signinbtn');
    //await page.click("a[id=signinbtn]");
    await page.waitForNavigation()

    await page.waitForFunction(
  'document.querySelector("body").innerText.includes("Hi user")'
);
    await page.screenshot({ path: screenshot })
    browser.close()
    console.log('See screenshot: ' + screenshot)
  })()
} catch (e) {
  console.log(e);
}
