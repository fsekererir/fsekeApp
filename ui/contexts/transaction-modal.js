import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TransactionModalContext = createContext({});

export const TransactionModalContextProvider = ({ children }) => {
  const [openModals, setOpenModals] = useState([]);

  const closeModal = (modalNames) => {
    if (!modalNames || modalNames.length === 0) return;
    const modals = openModals.filter(modal => !modalNames.includes(modal));
    setOpenModals(modals);
  };

  const closeAllModals = () => {
    setOpenModals([]);
  };

  const openModal = (modalName) => {
    if (!openModals.includes(modalName)) {
      setOpenModals([...openModals, modalName]);
    }
  };

  return (
    <TransactionModalContext.Provider
      value={{
        closeModal,
        closeAllModals,
        currentModal: openModals[openModals.length - 1],
        openModal,
        openModalCount: openModals.length,
      }}
    >
      {children}
    </TransactionModalContext.Provider>
  );
};

TransactionModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTransactionModalContext() {
  return useContext(TransactionModalContext);
}
