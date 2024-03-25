import { WebDriver } from "selenium-webdriver";
const { Builder, By, Key, until } = require("selenium-webdriver");
const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require('assert');

let driver: WebDriver;
driver = new Builder().forBrowser("chrome").build();
const baseUrl = 'https://spartantest-puppies.herokuapp.com/';

Given('I navigate to the puppy adoption site', async function () {
    await driver.get(baseUrl);
});

When('I view details for the puppy named {string}', async function (puppyName: string) {
    await driver.wait(until.urlContains('puppies'), 2000);
    const puppyDetailsButton = await driver.findElement(By.xpath(`//h3[text()='${puppyName}']/parent::*/following-sibling::div/form/input[@value='View Details']`));
    puppyDetailsButton.click();
});

Then('I return to the puppy list', async function () {
    const currentUrl = await driver.getCurrentUrl();

    if (currentUrl !== baseUrl) {
        await driver.navigate().back();
    }});

Then('I should be on the puppy list page', async function () {
    await driver.wait(until.urlIs(baseUrl), 2000);
    await driver.findElement(By.css("div > h2")).getText().then(function (text) {
        assert.equal(text, "Puppy List");
    });
});

Then('I should see {string} on the {int} page', async function (puppyName: string, pageNumber: number) {
    const elements = await driver.findElements(By.css("div > h3"));
    const texts = await Promise.all(elements.map(element => element.getText()));
    assert.ok(texts.includes(puppyName), `Could not find element with text: ${puppyName}`);
});


Then('the adoption fee should be {string}', async function (adoptionFee: string) {
    const feesElement = await driver.findElement(By.css("[class='fees']"));
    const text = await feesElement.getText();
    if (!text.includes(adoptionFee)) {
        throw new Error(`Expected adoption fee "${adoptionFee}" not found in "${text}"`);
    }
})

When('I go to the {int} page', async function (toPageNumber: number) {
    let currentPageNumber = await getCurrentPageNumber();

    while (currentPageNumber !== toPageNumber) {
        const nextPageButton = await driver.findElement(By.css(`#content > div.pagination > a.${toPageNumber > currentPageNumber ? 'next' : 'previous'}_page`));
        await nextPageButton.click();
        currentPageNumber = await getCurrentPageNumber();
    }
});

async function getCurrentPageNumber() {
    const currentUrl = await driver.getCurrentUrl();
    const match = currentUrl.match(/page=(\d+)/);
    return match ? parseInt(match[1]) : 1;
}

When('I click the {string} button', async function (buttonText: string) {
    const button = await driver.findElement(By.xpath(`//input[@value='${buttonText}']`));
    await button.click();
});

When('I adopt the puppy named {string}', async function (puppyName: string) {
    const button = await driver.findElement(By.xpath(`//input[@value='${puppyName}']`));
    await button.click();
});

Then('On the list to adoption there is {string}', async function (puppyName: string) {
    const puppyNameHeader = await driver.findElement(By.xpath(`//h2[text()='${puppyName}:']`));
    const isHeaderVisible = await puppyNameHeader.isDisplayed();

    assert.strictEqual(isHeaderVisible, true, `Header with puppy name "${puppyName}:" is not visible.`);
});

When('I complete the adoption process with a credit card', async function () {
    const orderName = await driver.findElement(By.id("order_name"));
    const orderAddress = await driver.findElement(By.id("order_address"));
    const orderEmail = await driver.findElement(By.id("order_email"));
    const orderPayType = await driver.findElement(By.id("order_pay_type"))
    await orderName.sendKeys("John Doe");
    await orderAddress.sendKeys("123 Main Street");
    await orderEmail.sendKeys("john@example.com");
    await orderPayType.sendKeys("Credit card", Key.RETURN);
});

When("I add a {string} for {string}", async function (addElement: string, pet: string) {
    let elementId;

    switch (addElement) {
        case "Collar & Leash":
            elementId = "collar";
            break;
        case "Chew Toy":
            elementId = "toy";
            break;
        case "Travel Carrier":
            elementId = "carrier";
            break;
        case "First Vet Visit":
            elementId = "vet";
            break;
        default:
            throw new Error(`Invalid addElement: ${addElement}`);
    }
    const elementToClick = await driver.findElement(By.xpath(`//h2[contains(text(), '${pet}:')]/following::tr//input[@id='${elementId}']`));
    await elementToClick.click();
});

Then('I should see a confirmation message for the adoption', async function () {
    const confirmationMessage = await driver.findElement(By.id("notice"));
    const expectedMessage = "Thank you for adopting a puppy!";

    const messageText = await confirmationMessage.getText();
    if (!messageText.includes(expectedMessage)) {
        throw new Error(`Expected adoption fee "${expectedMessage}" not found in "${confirmationMessage}"`);
    }
});