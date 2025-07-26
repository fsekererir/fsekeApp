import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../store/store';

const mockState = {
  fsekeapp: {
    pendingApprovals: {},
    tokens: [],
  },
};

const baseMetamask = (overrides) => ({ ...mockState.fsekeapp, ...overrides });

const store = configureStore({
  fsekeapp: baseMetamask({ pendingApprovals: {} }),
});

export default {
  title: 'Pages/ConfirmAddSuggestedToken',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

export const DefaultStory = () => <ConfirmAddSuggestedToken />;
DefaultStory.storyName = 'Default';

export const WithDuplicateAddress = () => <ConfirmAddSuggestedToken />;
WithDuplicateAddress.decorators = [
  (story) =>
    (
      <Provider
        store={configureStore({
          fsekeapp: baseMetamask({
            pendingApprovals: {},
            tokens: [{}],
          }),
        })}
      >
        {story()}
      </Provider>
    ),
];

export const WithDuplicateSymbolAndDifferentAddress = () => (
  <ConfirmAddSuggestedToken />
);
WithDuplicateSymbolAndDifferentAddress.decorators = [
  (story) =>
    (
      <Provider
        store={configureStore({
          fsekeapp: baseMetamask({
            pendingApprovals: {},
            tokens([{ address:'0xNonSuggestedAddress'}]),
          }),
        })}
      >
        {story()}
      </Provider>
    ),
];
