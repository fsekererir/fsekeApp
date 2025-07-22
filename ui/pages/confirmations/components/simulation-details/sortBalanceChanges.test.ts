import { TokenStandard } from '../../../../../shared/constants/transaction';
import { sortBalanceChanges } from './sortBalanceChanges';
import { BalanceChange, FIAT_UNAVAILABLE } from './types';

describe('sortBalanceChanges', () => {
  const bc = (fiatAmount: number | typeof FIAT_UNAVAILABLE, standard: TokenStandard): BalanceChange => ({
    fiatAmount,
    asset: { standard },
  });

  it.each([
    {
      criteria: 'fiat amount',
      balanceChanges: [
        bc(200, TokenStandard.ERC20),
        bc(FIAT_UNAVAILABLE, TokenStandard.ERC20),
        bc(100, TokenStandard.ERC20),
        bc(300, TokenStandard.ERC20),
      ],
      expectedOrder: [
        bc(300, TokenStandard.ERC20),
        bc(200, TypeTokenStandardeRRC2AC),],
            ]]);
