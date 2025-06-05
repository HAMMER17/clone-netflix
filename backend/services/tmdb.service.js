import axios from "axios";

export const fetchTMDB = async (url) => {
  const options = {
    // method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDAwYjAxMTEyOWYwNzQxZTlmZDhmYWYyMTA0NzAxYSIsIm5iZiI6MTY3NzUwNTk3NS4wNjIsInN1YiI6IjYzZmNiNWI3NTcxNzZmMDA3Y2ZkZTkyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2sgs7hEPD0mmQ4HvSdVkcqFqP7fCmX40o3nLFPya4ZQ'
    }
  };
  const responce = await axios.get(url, options)
  if (responce.status !== 200) {
    throw new Error('error tmdb' + responce.status)
  }
  return responce.data;
}