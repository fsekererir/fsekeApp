
function getValues(pendingApproval, _t, actions) {
  return {
    onCancel: () => actions.resolvePendingApproval(pendingApproval.id, null) && actions.deleteInterface(pendingApproval.requestData.id),
  };
}

const snapDefault = {
  getValues,
};

export default snapDefault;
