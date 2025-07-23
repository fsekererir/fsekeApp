import React from 'react';
import AccountList from './account-list';

const story = {
  title: 'Pages/CreateAccount/ConnectHardware/AccountList',
  component: AccountList,
  args: {
    onPathChange: () => {},
    selectedPath: 'selectedPath',
    device: 'device',
    accounts: [
      {
        name: 'This is a Really Long Account Name',
        address: '0x64a845a5b02460acf8a3d84503b0d68d028b4bb4',
        index: 0,
        balance: '0x176e5b6f173ebe66',
      },
    ],
    connectedAccounts: [
      {
        name: 'This is a Really Long Account Name',
        address: '0x64a845a5b02460acf8a3d84503b0d68d028b4bb4',
        index: 0,
        balance: '0x176e5b6f173ebe66',
      },
    ],
    chainId: 'chainId',
    rpcPrefs: {},
    selectedAccounts: [
      {
        name:
          "This is a Really Long Account Name That's Probably Going to Wrap Anyway",
          address:
            "this-is-a-really-long-account-address-that-probably-no-one-will-ever-have-but-hey-why-not",
          index:
            Math.floor(Math.random() * (999 - 1 + 1)) + 1, // Random index between 1 and 999
          balance:
            Math.floor(Math.random() * (999 - 1 + 1)) + // Random balance between 
      },
      
hdPaths :[
{ name : "Ledger Live", value : `m/4'/`},
{ name : "Legacy (MEW / MyCrypto)", value : `m/`},
{ name :
"BIP Custom Path", value :
}
]
}

export default story;

export const Default = args => <AccountList {...args} />;
