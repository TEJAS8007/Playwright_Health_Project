
const { expect } = require('@playwright/test');


exports.waitForLcators = async (page, selector, timeout = 5000) => {
    try {
        await page.waitForSelector(selector, { state: 'visible', timeout });
        console.log(`Element '${selector}' is visible.`);
    } catch (error) {
        console.error(`Timeout waiting for selector '${selector}'`);
        throw error;
    }
};

exports.clickButton = async (page, selector) => {
  try {
    
    const elementHandle = await page.waitForSelector(selector, {
      state: 'visible',
      timeout: 5000
    });

    
    const isDisabled = await elementHandle.getAttribute('disabled');
    if (isDisabled !== null) {
      throw new Error(`Button '${selector}' is visible but disabled`);
    }

    
    await elementHandle.click();
    console.log(`Clicked on button: ${selector}`);
  } catch (error) {
    console.error(`Failed to click on button: ${selector}`);
    console.error(`Error: ${error.message}`);
    throw error; 
  }
};


exports.VerifyUrl_Title = async (page, title, url) => {
    try {
        await expect(page).toHaveTitle(title);
        console.log('Actual Title:', await page.title());

        await expect(page).toHaveURL(url);
        console.log('Actual URL:', page.url());
    } catch (error) {
        throw error;
    }
};

