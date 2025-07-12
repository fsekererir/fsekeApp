
```javascript
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { I18nContext } from '../../../contexts/i18n';
import ButtonGroup from '../../../components/ui/button-group';
import ButtonPrimary from '../../../components/ui/button-primary';
import Typography from '../../../components/ui/typography';

export default function TransactionSettings({
  onSelect,
  onModalClose,
  maxAllowedSlippage,
  currentSlippage,
  isDirectWrappingEnabled,
}) {
  const t = useContext(I18nContext);
  
  const [customValue, setCustomValue] = useState('');
  
  const updateTransactionSettings = () => {
    if (currentSlippage !== customValue) {
      onSelect(customValue);
    }
    onModalClose();
    
    setCustomValue('');
    dispatch(setSwapsErrorKey(''));
    
    let notificationText = '';
    
    if (customValue && customValue < -1) {
      notificationText = t('swapSlippageNegativeDescription');
      
      setNewSwapsErrorKey(SLIPPAGE_NEGATIVE_ERROR);
      
      return;
      
    }
    
    if (customValue && customValue > maxAllowedSlippage) {
      notificationText = t('swapSlippageOverLimitDescription');
      
      setNewSwapsErrorKey(SLIPPAGE_VERY_HIGH_ERROR);
      
      return;
      
    }
    
     ...other code
    
} 

TransactionSettings.propTypes = {
...PropTypes
};
