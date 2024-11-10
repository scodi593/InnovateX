import { Builder,By, Key, until } from 'selenium-webdriver';

(async function testAdminLogin() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('http://localhost:5173/auth/login');
        await driver.manage().window().maximize();
        await driver.wait(until.elementLocated(By.name('email')), 10000);
        await driver.findElement(By.name('email')).sendKeys('pakshal31@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Pmmn@3108', Key.RETURN);
        await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div[1]/div/aside/div/h1')), 50000); // xpath
        const header = await driver.findElement(By.xpath('//*[@id="root"]/div[1]/div/aside/div/h1')).getText();
        
        if (header === 'Admin Panel') {
            console.log('Test Passed: Successfully logged in and navigated to Admin Panel.');
        } else {
            console.log('Login failed or did not navigate to Admin Panel. Found:', header);
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
})();