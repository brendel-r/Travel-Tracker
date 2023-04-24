const fetchAPI = (url) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong!')
      }
      return res.json()
    })
};

export const fetchAllData = () => {
  try {
    return Promise.all([
      fetchAPI('http://localhost:3001/api/v1/travelers'),
      fetchAPI('http://localhost:3001/api/v1/trips'),
      fetchAPI('http://localhost:3001/api/v1/destinations')
    ]);
  }
  catch (err) {
    throw new Error(err.message)
  };
};

export const addTripToDataBase = (tripData) => {
  console.log('addTripToDataBase', tripData)
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tripData)
  })
    .then(res => {
      if (!res.ok) {
        console.log(res)
        throw new Error('Something went wrong!')
      }
      console.log(res.json())
      return res.json()
    })
};

