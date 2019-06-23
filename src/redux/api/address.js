import axios from 'axios';

export const getAddress = ({ formattedAddress }) =>
  axios({
    method: 'POST',
    url: 'https://dev-api.shipwell.com/v2/locations/addresses/validate/',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    data: {
      formatted_address: formattedAddress,
    },
  });

export default { getAddress };
