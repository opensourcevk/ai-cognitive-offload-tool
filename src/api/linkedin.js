import { mockData } from '../mockData';

/**
 * Fetches Visa Sponsorship jobs from the backend service.
 *
 * The backend (e.g., Node.js or Python) handles securely authenticating
 * and querying the LinkedIn API or a web scraping proxy to retrieve
 * the actual job listings.
 *
 * @returns {Promise<Array>} Array of job objects.
 */
export const fetchLinkedInJobs = async () => {
  try {
    const response = await fetch('/api/jobs/linkedin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Backend unavailable or fetch failed. Falling back to mock data.", error);
    // For demonstration purposes, if the backend call fails,
    // we return the mock job board data so the UI isn't empty.
    return mockData;
  }
};
