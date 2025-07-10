const {test,expect} = require ('@playwright/test');

test('Dates_Test',async ({page}) => {

    await page.goto('https://katalon-demo-cura.herokuapp.com/#appointment',
        {
            state :'load'
        }
    );
    
    await page.locator("//a[@id='btn-make-appointment']").click();

    await page.locator("//input[contains(@id,'txt-username')]").fill('John Doe');
    await page.locator("//input[contains(@id,'txt-pas')]").fill('ThisIsNotAPassword');
    await page.locator("//button[contains(@id,'btn-login')]").click();

    await page.waitForSelector("//input[@id='txt_visit_date']",{state:'visible'});
    await page.locator("//input[@id='txt_visit_date']").click();

    await page.waitForTimeout(1000);

    await page.locator("//input[@id='txt_visit_date']").fill('15/09/2025');

    await page.waitForTimeout(1000);
    await page.close();

});