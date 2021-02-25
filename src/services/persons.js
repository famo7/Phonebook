import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(url).then((respons) => {
    return respons.data;
  });
};

const create = (newObject) => {
  return axios.post(url, newObject).then((respons) => {
    return respons.data;
  });
};

const deletePerson = (id) => {
  return axios.delete(url + "/" + id, { id }).then((response) => {
    return response.data;
  });
};

export default { getAll, create, deletePerson };
