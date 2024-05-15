// services/serverService.js
import axios from 'axios';

export const fetchServerStatus = async () => {
  try {
    const response = await axios.get('/server-status.php');
    return response.data;
  } catch (error) {
    console.error('Error fetching server status:', error);
    throw error;
  }
};
