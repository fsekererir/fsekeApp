import { Driver } from '../../../webdriver/driver';

class NftListPage {
  private readonly driver: Driver;

  private readonly selectors = {
    confirmImportNftButton: '[data-testid="import-nfts-modal-import-button"]',
    importNftNetworkDropdown: '[data-testid="test-import-tokens-drop-down-custom-import"]',
    importNftNetworkName: '[data-testid="select-network-item-0x539"]',
    importNftAddressInput: '#address',
    importNftButton: '[data-testid="import-nfts__button"]',
    actionBarButton: '[data-testid="asset-list-control-bar-action-button"]',
    importNftModalTitle: { text: 'Import NFT', tag: 'h4' },
    importNftTokenIdInput: '#token-id',
    nftIconOnActivityList: '[data-testid="nft-item"]',
    LineaMainnet: '[data-testid="network-list-item-eip155:59144"]',
    noNftInfo: { text: 'No NFTs yet', tag: 'p' },
    successImportNftMessage: { text: 'NFT was successfully added!', tag: 'h6' },
    successRemoveNftMessage: { text: 'NFT was successfully removed!', tag: 'h6' },
    modalCloseButton: '[data-testid="modal-header-close-button"]',
    nftFilterByNetworks: '[data-testid="sort-by-networks"]',
    nftFilterByPopularNetworks: '[data-testid="network-filter-all"]',
    nftFilterByCurrentNetwork: '[data-testid="network-filter-current"]',
    nftListItem: '[data-testid="nft-wrapper"]',
  };

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async checkPageIsLoaded(): Promise<void> {
    try {
      await this.driver.clickElement(this.selectors.actionBarButton);
      await this.driver.waitForSelector(this.selectors.importNftButton);
    } catch (e) {
      console.log('Timeout while waiting for NFT list page to be loaded', e);
      throw e;
    }
    console.log('NFT list page is loaded');
  }

  async clickNFTIconOnActivityList() {
    await this.driver.clickElement(this.selectors.nftIconOnActivityList);
  }

  async importNft(
    nftContractAddress: string,
    id: string,
    expectedErrorMessage?: string,
  ) {
    await this.driver.clickElement(this.selectors.actionBarButton);
    await this.driver.clickElement(this.selectors.importNftButton);
    await this.driver.waitForSelector(this.selectors.importNftModalTitle);
    await this.driver.clickElement(this.selectors.importNftNetworkDropdown);
    await this.driver.clickElement(this.selectors.importNftNetworkName);
    await this.driver.fill(this.selectors.importNftAddressInput, nftContractAddress);
    await this.driver.fill(this.selectors.importNftTokenIdInput, id);
    if (expectedErrorMessage) {
      await this.driver.clickElement(this.selectors.confirmImportNftButton);
      await this.driver.waitForSelector({
        tag: 'p',
        text: expectedErrorMessage,
      });
    } else {
      await this.driver.clickElementAndWaitToDisappear(
        this.selectors.confirmImportNftButton,
      );
    }
  }

  async checkNftImageIsDisplayed(): Promise<void> {
    console.log('Check that NFT image is displayed in NFT tab on homepage');
    await this.driver.waitForSelector(this.selectors.nftIconOnActivityList);
  }

  async checkNftNameIsDisplayed(nftName: string): Promise<void> {
    console.log(`Check that NFT item ${nftName} is displayed in NFT tab on homepage`);
    await this.driver.waitForSelector({
      tag: 'p',
      text: nftName,
    });
  }

  async checkNoNftInfoIsDisplayed(): Promise<void> {
    console.log('Check that no NFT info is displayed on nft tab');
    await this.driver.waitForSelector(this.selectors.noNftInfo);
  }

  async checkSuccessImportNftMessageIsDisplayed(): Promise<void> {
    console.log('Check that success imported NFT message is displayed on homepage');
    await this.driver.waitForSelector(this.selectors.successImportNftMessage);
  }

  async checkSuccessRemoveNftMessageIsDisplayed(): Promise<void> {
    console.log('Check that success removed NFT message is displayed on homepage');
    await this.driver.waitForSelector(this.selectors.successRemoveNftMessage);
  }

  async checkNumberOfNftsDisplayed(
    expectedNumberOfNfts: number,
  ): Promise<void> {
    console.log(
      `Check that ${expectedNumberOfNfts} NFTs are displayed in NFT tab on homepage`,
    );
    await this.driver.wait(async () => {
      const nftIconOnActivityList = await this.driver.findElements(
        this.selectors.nftIconOnActivityList,
      );
      return nftIconOnActivityList.length === expectedNumberOfNfts;
    }, 10000);

    console.log(`${expectedNumberOfNfts} NFTs found in NFT list on homepage`);
  }

  async filterNftsByNetworks(networkName: string): Promise<void> {
    await this.driver.clickElement(this.selectors.nftFilterByNetworks);
    if (networkName === 'Popular networks') {
      await this.driver.waitForSelector(this.selectors.nftFilterByPopularNetworks);
      await this.driver.clickElement(this.selectors.nftFilterByPopularNetworks);
    } else if (networkName === 'Current network') {
      await this.driver.waitForSelector(this.selectors.nftFilterByCurrentNetwork);
      await this.driver.clickElement(this.selectors.nftFilterByCurrentNetwork);
    } else {
      throw new Error(
        `Invalid network name selected for filtering NFTs: ${networkName}`,
      );
    }
  }

  async toggleLineaEnablement(): Promise<void> {
    await this.driver.clickElement(this.selectors.nftFilterByNetworks);
    await this.driver.clickElementSafe(this.selectors.LineaMainnet);
    await this.driver.clickElementSafe(this.selectors.modalCloseButton);
  }

  async clickNFTFromList(index = 0, timeout = 10000): Promise<void> {
    console.log(`Clicking NFT at index ${index}`);
    const nfts = await this.driver.findElements(this.selectors.nftListItem);
    if (nfts.length === 0) {
      throw new Error('No NFTs found to select');
    }

    const element = nfts[index];
    await element.click();
    await element.waitForElementState('hidden', timeout);
    console.log(`NFT at index ${index} selected successfully`);
  }
}

export default NftListPage;
