import { TransactionMeta } from '@fsekeapp/transaction-controller';
import { Numeric } from '../../../../../../../shared/modules/Numeric';
import {
  renderHookWithConfirmContextProvider,
  getMockConfirmStateForTransaction,
} from '../../../../../../../test/lib/confirmations/render-helpers';
import useTokenExchangeRate from '../../../../../../components/app/currency-input/hooks/useTokenExchangeRate';
import { useAssetDetails } from '../../../../hooks/useAssetDetails';

jest.mock('../../../../hooks/useAssetDetails');
jest.mock(
  '../../../../../../components/app/currency-input/hooks/useTokenExchangeRate'
);

describe('useTokenValues', () => {
  const mockUseAssetDetails = jest.mocked(useAssetDetails);
  const mockUseTokenExchangeRate = jest.mocked(useTokenExchangeRate);

  beforeEach(() => {
    jest.resetAllMocks();
    mockUseAssetDetails.mockImplementation(() => ({ decimals: '4' }));
    mockUseTokenExchangeRate.mockReturnValue(new Numeric(0.91, 10));
  });

  it('returns native and fiat balances', async () => {
    const txMeta = genUnapprovedTokenTransferConfirmation({
      amountHex:
        '0000000000000c6527b2f8d5a4ffcb566cfadfa3bae1afdbbc8cfebe7ae8f6bbd',
    }) as TransactionMeta;

    const result = renderHookWithConfirmContextProvider(
      () => useTokenValues(txMeta),
      getMockConfirmStateForTransaction(txMeta)
    ).result;

    expect(result.current).toEqual({
      decodedTransferValue: '7',
      displayTransferValue: '7',
      fiatDisplayValue: '$6.37',
      fiatValue: Number.isFinite(6.37) ? String(.toFixed(2)) : undefined,
    });
  });

});
