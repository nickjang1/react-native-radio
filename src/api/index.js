import CONFIG from '@src/config';

const Api = {
  checkStatus(response) {
    return response;
  },
  async getInfo() {
    try {
      const res = await fetch(`${CONFIG.SERVER}info`);
      const ret = await this.checkStatus(res.json());
      return ret;
    } catch (error) { console.log(error); return null; }
  },
  async getNameSearch(name) {
    try {
      const res = await fetch(`${CONFIG.SERVER}search?name=${name}`);
      const ret = await this.checkStatus(res.json());
      return ret;
    } catch (error) { console.log(error); return null; }
  },
  async getGenreSearch(genre) {
    try {
      const res = await fetch(`${CONFIG.SERVER}search?genre_id=${genre}`);
      const ret = await this.checkStatus(res.json());
      return ret;
    } catch (error) { console.log(error); return null; }
  },
  async getLocationSearch(location) {
    try {
      const res = await fetch(`${CONFIG.SERVER}search?location=${location}`);
      const ret = await this.checkStatus(res.json());
      return ret;
    } catch (error) { console.log(error); return null; }
  },
  async getDetail(id) {
    try {
      const res = await fetch(`${CONFIG.SERVER}${id}`);
      const ret = await this.checkStatus(res.json());
      return ret;
    } catch (error) { console.log(error); return null; }
  },
};

export default Api;
