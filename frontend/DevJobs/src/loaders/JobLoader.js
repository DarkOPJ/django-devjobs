import { fetchJobs } from '../services/JobApi';
import { redirect } from 'react-router-dom';

export const jobLoader = async ({ params }) => {
  try {
    const res = await fetchJobs(`/${params.id}/`);
    return res;
  } catch (error) {
    if (error?.status === 401 || error?.status === 403) {
      // Can't call toast or useNavigate inside a loader, so store the
      // message in sessionStorage and let LoginPage drain it on mount.
      sessionStorage.setItem(
        'pendingToast',
        JSON.stringify({ type: 'error', message: 'Please log in to proceed.' })
      );
      throw redirect('/login');
    }
    throw new Error(
      `There was an error fetching the job data. Details: ${error.message}`
    );
  }
};
