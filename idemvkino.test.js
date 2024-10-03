const { clickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(50000);
});

afterEach(() => {
  page.close();
});

describe("Let's go to the cinema tests", () => {
  beforeEach(async () => {
    // page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });
    
  test("Booking for last the Witcher should be successful", async () => {
    await clickElement(page, "a:nth-child(7)");
    await clickElement(page, "[data-seance-id='223']");
    const actual = await getText(page, "h2[class='buying__info-title']");
    expect(actual).toContain("Ведьмак");
  });
   
  test("Book button is inactive", async () => {
    await clickElement(page, "a:nth-child(5)");
    await clickElement(page, "[data-seance-id='218']");
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
    await clickElement(page, "div:nth-child(6) span:nth-child(5)");
    await clickElement(page, "div:nth-child(6) span:nth-child(6)");
    await clickElement(page, "div:nth-child(6) span:nth-child(7)");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:"); 
  });

  test("Book button is inactive", async () => {
    await clickElement(page, "a:nth-child(4)");
    await clickElement(page, "[data-seance-id='199']");
    await page.waitForSelector(".buying__info-title", {
      visible: true,
    });
     try {
       await clickElement(page, "div:nth-child(2) span:nth-child(8)");
       const isDisabled = await page.$eval(".acceptin-button", (button) => {
         return button.disabled;
       });
       const actual = String(isDisabled);
       expect(actual).toContain("true");
     } catch (error) {
       throw new Error(`the book button should not be active`);
     }
  });

})