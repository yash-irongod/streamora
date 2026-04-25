import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../store/toastSlice';

export default function Toast() {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);

  useEffect(() => {
    if (!message) return undefined;

    const timer = setTimeout(() => {
      dispatch(clearToast());
    }, 2800);

    return () => clearTimeout(timer);
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className="toast show">
      <div className={`toast-dot ${type === 'remove' ? 'red' : ''}`} />
      {message}
    </div>
  );
}
