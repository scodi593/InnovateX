import { Builder, By, Key, until } from 'selenium-webdriver';

(async function testRegistration() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navigate to the registration page
        await driver.get('http://localhost:5173/auth/register');
        await driver.manage().window().maximize();
        
        // Wait until the username field is located
        await driver.wait(until.elementLocated(By.name('userName')), 10000);
        
        // Fill in the registration form
        await driver.findElement(By.name('userName')).sendKeys('pakshal3101');
        await driver.findElement(By.name('email')).sendKeys('pakshal3101@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3101', Key.RETURN);
        
        // Waiting for the toast notification to appear using the given XPath
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[2]/ol/li/div/div')), 10000);
        const toastMessage = await driver.findElement(By.xpath('//*[@id="root"]/div[2]/ol/li/div/div')).getText();
        
        if (toastMessage.includes('Registration successful')) {
            console.log('User registration successful.');
        } else {
            console.log('User registration failed. Toast message:', toastMessage);
        }
        
    } catch (error) {
        console.error('An error occurred during registration:', error);
    } finally {
        await driver.quit();
    }
})();
