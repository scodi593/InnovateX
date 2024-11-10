import { Builder, By, Key, until } from 'selenium-webdriver';

(async function testEventtButton() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        //Navigate to login page
        await driver.get('http://localhost:5173/auth/login');
        await driver.manage().window().maximize();

        //Log in 
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        await driver.findElement(By.name('email')).sendKeys('pakshal2805@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3108', Key.RETURN);

        //verify whether we are on homepage
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/header/div/a/span')), 10000); // Verify successful login
        
        // wating for view button to be enabled and clickable
        const eventButtonXpath = "//div[contains(@id, 'Disco Night arts')]/div/button";
        await driver.wait(until.elementLocated(By.xpath(eventButtonXpath)), 10000); // Wait for the button to exist
        const eventButton = await driver.findElement(By.xpath(eventButtonXpath));
        await driver.wait(until.elementIsVisible(eventButton), 10000); // Ensure it is visible
        await driver.wait(until.elementIsEnabled(eventButton), 10000); // Ensure it is enabled
        await eventButton.click();

        // Wait for the dialog box to appear
        await driver.wait(until.elementLocated(By.xpath('//*[@id="radix-:r7:"][@role="dialog"]')), 10000); // Locate the dialog box by ID and role

        const isDialogDisplayed = await driver.findElement(By.xpath('//*[@id="radix-:r7:"][@role="dialog"]')).isDisplayed();

        if (isDialogDisplayed) {
            console.log('Test Passed: The dialog box opened successfully.');
        } else {
            console.log('Test Failed: The dialog box did not open.');
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
