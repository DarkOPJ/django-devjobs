// const API_TO_USE = '/jobApi'
// const API_TO_USE = 'https://jsondevdessert.onrender.com/jobs'
const API_TO_USE = 'http://localhost:8000/jobs'

/** Creates an Error that carries the HTTP status code so callers can detect 401/403. */
const httpError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

// Used to fetch jobs from the api
export const fetchJobs = async (endpoint) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['Authorization'] = `Token ${token}`;

    const res = await fetch(`${API_TO_USE}${endpoint}`, { headers });
    if (!res.ok) {
      throw httpError(res.status, `HTTP Error ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('An error occurred fetching the data.', error);
    throw error;
  }
};
// Used to fetch jobs from the api

// Used to add a new job to the api
export const addNewJob = async (newJob) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Token ${token}`;

    const res = await fetch(`${API_TO_USE}/create/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw httpError(res.status, `Failed to create job: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('An error occurred adding a job.', error);
    throw error;
  }
};
// Used to add a new job to the api

// Used to delete a job
export const deleteJob = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['Authorization'] = `Token ${token}`;

    const res = await fetch(`${API_TO_USE}/${id}/`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) {
      throw httpError(res.status, `Failed to delete job: ${res.status}`);
    }

    if (res.status === 204) {
      return { success: true };
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('An error occurred deleting the job.', error);
    throw error;
  }
};
// Used to delete a job

// Used to edit a job
export const editJob = async (id, edittedJob) => {
  try {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Token ${token}`;

    const res = await fetch(`${API_TO_USE}/${id}/`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(edittedJob),
    });
    if (!res.ok) {
      throw httpError(res.status, `Failed to edit job: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error('An error occurred editing the job.', error);
    throw error;
  }
};
// Used to edit a job
