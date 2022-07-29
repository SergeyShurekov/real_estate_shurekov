import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
      'X-RapidAPI-Key': 'b9c8083be4msh8ce7434a2a67552p154f09jsnece99debc73e',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  })
  return data;
}