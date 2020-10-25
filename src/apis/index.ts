import axios from 'axios';

export interface Record {
    uid: string;
    author: string;
    pic: string;
    pubdate: string;
    title: string;
    description: string;
}
const getRecords: () => Promise<Record[]> = () =>
  new Promise<Record[]>((resolve, reject) => {
    axios
      .get('/api/records')
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => reject(err));
  });

const httpClient = {
  getRecords,
};

export default httpClient;
