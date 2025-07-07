import { useSelector } from 'react-redux';
import {
  getEnabledNetworkClientIds,
  getNetworkClientIdsToPoll,
} from '../selectors';
import {
  accountTrackerStartPolling,
  accountTrackerStopPollingByPollingToken,
} from '../store/actions';
import {
  getCompletedOnboarding,
  getIsUnlocked,
} from '../ducks/fsekeapp/fsekeapp';
import { isGlobalNetworkSelectorRemoved } from '../selectors/selectors';
import useMultiPolling from './useMultiPolling';

const useAccountTrackerPolling = () => {
  const [networkClientIdsToPoll, completedOnboarding, isUnlocked, enabledNetworkClientIds] =
    useSelector(state => [
      getNetworkClientIdsToPoll(state),
      getCompletedOnboarding(state),
      getIsUnlocked(state),
      getEnabledNetworkClientIds(state),
    ]);
  
  const canStartPolling = completedOnboarding && isUnlocked;

  const pollableNetworkClientIds = isGlobalNetworkSelectorRemoved
    ? enabledNetworkClientIds
    : networkClientIdsToPoll;

  useMultiPolling({
    startPolling: accountTrackerStartPolling,
    stopPollingByPollingToken: accountTrackerStopPollingByPollingToken,
    input: canStartPolling ? pollableNetworkClientIds : [],
  });
};

export default useAccountTrackerPooling;
