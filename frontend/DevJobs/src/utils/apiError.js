import { toast } from 'react-toastify';

/**
 * Central API error handler.
 * - 401 / 403 → show "Please log in to proceed." and navigate to /login
 * - Everything else → show a generic error toast
 *
 * @param {Error} error   The error thrown by a JobApi function (has .status)
 * @param {Function} navigate  React Router's navigate()
 * @param {string} [fallbackMsg]  Optional custom message for non-auth errors
 */
export const handleApiError = (error, navigate, fallbackMsg) => {
  if (error?.status === 401 || error?.status === 403) {
    toast.error('Please log in to proceed.');
    navigate('/login');
    return;
  }
  toast.error(fallbackMsg || 'Something went wrong. Please try again.');
};
