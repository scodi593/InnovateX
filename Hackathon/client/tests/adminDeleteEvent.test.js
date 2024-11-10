import { Builder, By, Key, until } from 'selenium-webdriver';

(async function testAdminDeleteEvent() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Step 1: Admin Login
        await driver.get('http://localhost:5173/auth/login');
        await driver.manage().window().maximize();
        
        // Wait until the email field is located
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        await driver.findElement(By.name('email')).sendKeys('pakshal31@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3108', Key.RETURN);
        
        
        const deleteButtonXpath = "//img[@alt='Sample Event']/ancestor::div[@class='relative']/following-sibling::div/button[contains(text(),'Delete')]";
        await driver.wait(until.elementLocated(By.xpath(deleteButtonXpath)), 10000); // Wait for the button to exist
        const deleteButton = await driver.findElement(By.xpath(deleteButtonXpath));
        await driver.wait(until.elementIsVisible(deleteButton), 10000); // Ensure it is visible
        await driver.wait(until.elementIsEnabled(deleteButton), 10000); 
        await deleteButton.click();

        // Step 4: Wait for the toast message to appear
        const toastMessage = await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Event deleted')]")), 10000);
        await driver.wait(until.elementIsVisible(toastMessage), 10000);

        // Step 5: Verify the success message
        const toastText = await toastMessage.getText();

        if (toastText.includes('Event deleted')) {
            console.log('Test Passed: Event deleted successfully.');
        } else {
            throw new Error('Event deletion failed. Found: ' + toastText);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();
