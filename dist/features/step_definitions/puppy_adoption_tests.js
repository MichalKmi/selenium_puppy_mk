"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const assert = require('assert');
const cucumber_1 = require("@cucumber/cucumber");
let driver;
driver = new selenium_webdriver_1.Builder().forBrowser("chrome").build();
(0, cucumber_1.Given)('I navigate to the puppy adoption site', async function () {
    driver.get('https://spartantest-puppies.herokuapp.com/');
});
(0, cucumber_1.When)('I view details for the puppy named {string}', async function (puppyName) {
    // const puppyLink = driver.findElement(By.xpath(`//a[contains(text(), '${puppyName}')]`)); 
    const puppyDetailsLink = driver.findElement(selenium_webdriver_1.By.css(`div.name > h3:contains('${puppyName}') + div.view input`));
    await puppyDetailsLink.click();
});
(0, cucumber_1.When)('I return to the puppy list', async function () {
    await driver.navigate().back();
});
(0, cucumber_1.When)('I search for the puppy named {string}', async function (puppyName) {
    const searchInput = await driver.findElement(selenium_webdriver_1.By.id('search'));
    await searchInput.sendKeys(puppyName);
    await searchInput.sendKeys(selenium_webdriver_1.Key.ENTER);
});
(0, cucumber_1.When)('I go to the second page', async function () {
    const nextPageButton = await driver.findElement(selenium_webdriver_1.By.xpath("//a[@class='next_page']"));
    await nextPageButton.click();
});
(0, cucumber_1.Then)('I should be on the puppy list page', async function () {
    const pageTitle = await driver.getTitle();
    assert(pageTitle).to.equal('Spartan Puppy Adoption');
});
(0, cucumber_1.Then)('I should see {string} on the first page', async function (puppyName) {
    const puppyElement = await driver.findElement(selenium_webdriver_1.By.xpath(`//a[contains(text(), '${puppyName}')]`));
    assert.ok(puppyElement, `${puppyName} not found on the first page`);
});
(0, cucumber_1.Then)('I should see {string} on the second page', async function (puppyName) {
    const puppyElement = await driver.findElement(selenium_webdriver_1.By.xpath(`//a[contains(text(), '${puppyName}')]`));
    assert.ok(puppyElement, `${puppyName} not found on the second page`);
});
(0, cucumber_1.Then)('the adoption fee should be {string}', async function (adoptionFee) {
    const adoptionFeeElement = await driver.findElement(selenium_webdriver_1.By.xpath("//p[@id='fees']"));
    const feeText = await adoptionFeeElement.getText();
    assert.strictEqual(feeText, `Adoption Fee: ${adoptionFee}`);
});
(0, cucumber_1.When)('I click the {string} button', async function (buttonText) {
    const button = await driver.findElement(selenium_webdriver_1.By.xpath(`//input[@value='${buttonText}']`));
    await button.click();
});
(0, cucumber_1.When)('I complete the adoption process with a credit card', async function () {
    console.log("to be implemented");
    return 'pending';
});
(0, cucumber_1.Then)('I should see a confirmation message for the adoption', async function () {
    console.log("to be implemented");
    return 'pending';
});
(0, cucumber_1.Then)('the total amount should have increased by the price of the carrier', async function () {
    console.log("to be implemented");
    return 'pending';
});
(0, cucumber_1.Then)('I should see a confirmation message for the adoption', async function () {
    console.log("to be implemented");
    return 'pending';
});
