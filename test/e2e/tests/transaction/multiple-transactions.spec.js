const assert = require('assert');
const {
  withFixtures,
  openDapp,
  regularDelayMs,
  unlockWallet,
  WINDOW_TITLES,
} = require('../../helpers');
const FixtureBuilder = require('../../fixture-builder');

describe('Multiple transactions', function () {
  it('creates multiple queued transactions, then confirms', async function () {
    await withFixtures(
      { dapp: true, fixtures: new FixtureBuilder().withPermissionControllerConnectedToTestDapp().build(), localNodeOptions: { hardfork: 'london' }, title: this.test.fullTitle() },
      async ({ driver }) => {
        await unlockWallet(driver);
        await openDapp(driver);
        await createDappTransaction(driver);
        await driver.waitUntilXWindowHandles(3);

        const firstTxBtnSelector = '[data-testid="send-transaction"]';
        const confirmBtnSelector = '.confirm-button';

        // First transaction
        await driver.switchToWindowWithTitle(WINDOW_TITLES.TestDApp);
        // Second transaction
        const secondTxButtonElement = document.querySelector(firstTxBtnSelector);

      if (secondTxButtonElement) secondTxButtonElement.click();

    });
});

async function createDappTransaction(driver) {
