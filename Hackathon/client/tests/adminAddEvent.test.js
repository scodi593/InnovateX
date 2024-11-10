import { Builder, By, Key, until } from "selenium-webdriver";

(async function testAdminAddEvent() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Step 1: Admin Login
    await driver.get("http://localhost:5173/auth/login");
    await driver.manage().window().maximize();

    // Wait until the email field is located
    await driver.wait(until.elementLocated(By.name("email")), 10000);
    await driver.findElement(By.name("email")).sendKeys("pakshal31@gmail.com");
    await driver
      .findElement(By.name("password"))
      .sendKeys("Pmmn@3108", Key.RETURN);

    // Step 2: Click "Add New Event" Button
    await driver.wait(
      until.elementLocated(
        By.xpath("//button[contains(text(), 'Add New Event')]")
      ),
      10000
    );
    await driver
      .findElement(By.xpath("//button[contains(text(), 'Add New Event')]"))
      .click();
    // Step 3: Upload an Image
    const imagePath =
      "C:\\Users\\Owner\\OneDrive\\Pictures\\assets\\pexels-zhuhehuai-716276.jpg"; // Change to your actual image file name
    await driver
      .findElement(By.xpath("//input[@type='file']"))
      .sendKeys(imagePath);
    await driver.wait(
      until.elementLocated(
        By.xpath("//p[contains(text(),'pexels-zhuhehuai-716276.jpg')]")
      ),
      15000
    );

    // Step 4: Fill in Event Details

    // Fill in Event Name
    await driver.findElement(By.name("eventName")).sendKeys("Sample Event");

    // Select Event Type
    await driver.findElement(By.name("type")).sendKeys("Social");

    // Fill in Participant Limit
    await driver.findElement(By.name("participantLimit")).sendKeys("10");

    // Fill in Price
    await driver.findElement(By.name("price")).sendKeys("20");

    // Fill in Description
    await driver
      .findElement(By.name("description"))
      .sendKeys("This is a description of the sample event.");

    // Fill in Date & Time
    const dateInput = await driver.findElement(By.name("eventDate"));

    await driver.wait(until.elementIsVisible(dateInput), 10000);
    await driver.wait(until.elementIsEnabled(dateInput), 10000);
    const eventDate = new Date("2024-12-05T15:30:00"); // Desired date and time
    const formattedDate = eventDate.toISOString().slice(0, 16);
    // Set the date value
    await driver.executeScript(
      "arguments[0].value = arguments[1];",
      dateInput,
      formattedDate
    );

    // Submit the Form
    await driver.wait(
      until.elementLocated(
        By.xpath("//button[contains(text(), 'Add') and @type='submit']")
      ),
      10000
    );
    const addbutton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Add') and @type='submit']")
    );
    await driver.wait(until.elementIsVisible(addbutton), 10000); // Ensure it is visible
    await driver.wait(until.elementIsEnabled(addbutton), 10000); // Ensure it is enabled Adjust selector if needed
    addbutton.click();

    // Wait for a success notification or redirect
    await driver.wait(
      until.elementLocated(
        By.xpath("//div[contains(text(), 'Event added successfully')]")
      ),
      10000
    );
    const successMessage = await driver
      .findElement(
        By.xpath("//div[contains(text(), 'Event added successfully')]")
      )
      .getText();

    // Verify the success message
    if (successMessage.includes("Event added successfully")) {
      console.log("Test Passed: Event created successfully.");
    } else {
      throw new Error("Event creation failed. Found: " + successMessage);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await driver.quit();
  }
})();
