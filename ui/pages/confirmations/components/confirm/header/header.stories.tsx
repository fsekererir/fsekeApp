import React from 'react';
import { Provider } from 'react-redux';

import { getMockTypedSignConfirmState } from '../../../../../../test/data/confirmations/helper';
import configureStore from '../../../../../store/store';

import Header from './header';
import { ConfirmContextProvider } from '../../../context/confirm';

const store = configureStore(getMockTypedSignConfirmState());

export default {
  title: 'Confirmations/Components/Confirm/Header',
  component: Header,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ConfirmContextProvider>
          <Story />
        </ConfirmContextProvider>
      </Provider>
    ),
  ],
};

export const Default = () => <Header />;
Default.storyName = 'Default';
