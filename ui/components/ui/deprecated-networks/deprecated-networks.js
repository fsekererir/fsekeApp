import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  BackgroundColor,
  BorderRadius,
  Severity,
} from '../../../helpers/constants/design-system';
import { getCurrentNetwork } from '../../../selectors';
import { getNetworkConfigurationsByChainId } from '../../../../shared/modules/selectors/networks';
import { getCompletedOnboarding } from '../../../ducks/fsekeapp/fsekeapp';
import { BannerAlert, Box } from '../../component-library';
import {
  CHAIN_IDS,
  DEPRECATED_NETWORKS,
} from '../../../../shared/constants/network';
import { updateNetwork } from '../../../store/actions';

const deprecatedGoerliChains = [
  CHAIN_IDS.GOERLI,
  CHAIN_IDS.LINEA_GOERLI,
  CHAIN_IDS.ARBITRUM_GOERLI,
  CHAIN_IDS.OPTIMISM_GOERLI
];

export default function DeprecatedNetworks() {
  const dispatch = useDispatch();
  const t = useI18nContext();
  const completedOnboarding = useSelector(getCompletedOnboarding);
  const [isClosed, setIsClosed] = useState(false);

  if (!completedOnboarding || isClosed) return null;

  const currentNetwork = useSelector(getCurrentNetwork);
  if (!currentNetwork) return null;

  const { chainId, rpcUrl } = currentNetwork;
  
  let props;
  
if (deprecatedGoerliChains.includes(chainId)) {
    props = {
      description: t('deprecatedGoerliNtwrkMsg'),
      actionButtonLabel: t('learnMoreUpperCase'),
      actionButtonProps: {
        href: 'https://github.com/eth-clients/goerli#goerli-goerlitzer-testnet',
        externalLink: true
      }
    };
} else if (DEPRECATED_NETWORKS.includes(chainId)) {
    props = { description: t('deprecatedNetwork') };
} else if (chainId === CHAIN_IDS.AURORA && rpcUrl.startsWith('https://aurora-mainnet.infura.io/')) {
    const networkConfigurations = useSelector(getNetworkConfigurationsByChainId);
    const networkConfiguration = networkConfigurations[chainId];
    props = {
      description: t('auroraRpcDeprecationMessage'),
      actionButtonLabel: t('switchToNetwork', ['mainnet.aurora.dev']),
      actionButtonOnClick: async () => {
        setIsClosed(true);
        networkConfiguration.rpcEndpoints[
          networkConfiguration.defaultRpcEndpointIndex
        ].url = 'https://mainnet.aurora.dev';

        await dispatch(updateNetwork(networkConfiguration));
      }
    };
}

if (!props) return null;

return (
    <Box
      className="deprecated-networks"
      backgroundColor={BackgroundColor.backgroundDefault}
      padding={4}
      borderRadius={BorderRadius.SM}
    >
      <BannerAlert severity={Severity.Warning} onClose={() => setIsClosed(true)} {...props} />
    </Box>
);}
