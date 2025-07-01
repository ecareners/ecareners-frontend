const API_BASE_URL = import.meta.env.VITE_API_URL;

// API function to get all SOPs
export const fetchAllSOPs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sops`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchAllSOPs:', error);
    throw error;
  }
};

// API function to get all Videos
export const fetchAllVideos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/videos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchAllVideos:', error);
    throw error;
  }
};

// API function to get SOP by ID
export const fetchSOPById = async (sopId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sops/${sopId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchSOPById:', error);
    throw error;
  }
};

// API function to create new SOP
export const createNewSOP = async (title, url, category = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, url, category }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error in createNewSOP:', error);
    throw error;
  }
};

// API function to update SOP
export const updateExistingSOP = async (sopId, title, url, category = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sops/${sopId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, url, category }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return true;
  } catch (error) {
    console.error('Error in updateExistingSOP:', error);
    throw error;
  }
};

// API function to delete SOP
export const deleteExistingSOP = async (sopId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sops/${sopId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return true;
  } catch (error) {
    console.error('Error in deleteExistingSOP:', error);
    throw error;
  }
}; 