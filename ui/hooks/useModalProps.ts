import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../store/actions';

type ModalProps = {
  props: Record<string, any>;
  hideModal: () => void;
};

export function useModalProps(): ModalProps {
  const modalProps = useSelector((state) => state.appState.modal.modalState?.props);
  const dispatch = useDispatch();
  return { props: modalProps, hideModal: () => dispatch(hideModal()) };
}
