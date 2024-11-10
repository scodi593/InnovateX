import { Builder, By, Key, until } from 'selenium-webdriver';

(async function testEventButton(eventName) {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navigate to login page
        await driver.get('http://localhost:5173/auth/login');
        await driver.manage().window().maximize();

        // Log in
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        await driver.findElement(By.name('email')).sendKeys('pakshal2805@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3108', Key.RETURN);

        // Verify whether we are on homepage
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/header/div/a/span')), 10000);

        // Waiting for the event button to be enabled and clickable
        const eventButtonXpath = `//div[contains(@id, '${eventName}')]/div/button`; // Use template literals for dynamic value
        await driver.wait(until.elementLocated(By.xpath(eventButtonXpath)), 10000);
        const eventButton = await driver.findElement(By.xpath(eventButtonXpath));
        await driver.wait(until.elementIsVisible(eventButton), 10000);
        await driver.wait(until.elementIsEnabled(eventButton), 10000);
        await eventButton.click();

        
        // Register for the event
        const registerButtonXpath = "//button[contains(text(),'Register')]";
        const registerButton = await driver.findElement(By.xpath(registerButtonXpath));
        await driver.wait(until.elementIsVisible(registerButton), 10000);
        await driver.wait(until.elementIsEnabled(registerButton), 10000);
        await registerButton.click();

        // Wait for the toast message confirming registration
        const toastMessageXpath = "//div[contains(text(), 'Registered for event successfully!')]";
        await driver.wait(until.elementLocated(By.xpath(toastMessageXpath)), 10000);

        const isToastDisplayed = await driver.findElement(By.xpath(toastMessageXpath)).isDisplayed();
        if (isToastDisplayed) {
            console.log('Test Passed: Registered for the event successfully and toast message appeared.');
        } else {
            console.log('Test Failed: Toast message did not appear after registration.');
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})('Cycling Event health');
