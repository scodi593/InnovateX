import { Builder,By, Key, until } from 'selenium-webdriver';

(async function testUserLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('http://localhost:5173/auth/login');
        await driver.manage().window().maximize();
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        await driver.findElement(By.name('email')).sendKeys('pakshal2805@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3108', Key.RETURN);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/header/div/a/span')), 50000); // xpath
        const header = await driver.findElement(By.xpath('//*[@id="root"]/div[1]/div/header/div/a/span')).getText();
        
        if (header === 'Event Hunt') {
            console.log('Test Passed: Successfully logged in and navigated to HomePage.');
        } else {
            console.log('Login failed or did not navigate to User HomePage. Found:', header);
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();