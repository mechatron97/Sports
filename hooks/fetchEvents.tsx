import axios from 'axios';

// const API_KEY = 'FBCO7E7UU25ZX7HO276K';

// const location = 'Mississauga';

const fetchEventbriteEvents = async () => {
  try {
    const response = await axios.get(
      `https://www.eventbriteapi.com/v3/users/me/?token=FBCO7E7UU25ZX7HO276K`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    throw error;
  }
};

export default fetchEventbriteEvents;
