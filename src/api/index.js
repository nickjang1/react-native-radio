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

  async getSearch(name = '', location = '', genreId = '', page = 1) {
    try {
      let url = `${CONFIG.SERVER}search`;
      let isFirst = true;

      if (name) {
        url = `${url}?name=${name}`;
        isFirst = false;
      }

      if (location) {
        url = isFirst ? `${url}?location=${location}` : `${url}&location=${location}`;
        isFirst = false;
      }

      if (genreId) {
        url = isFirst ? `${url}?genre_id=${genreId}` : `${url}&genre_id=${genreId}`;
        isFirst = false;
      }

      if (page !== 1) {
        url = isFirst ? `${url}?page=${page}` : `${url}&page=${page}`;
        isFirst = false;
      }

      const res = await fetch(url);
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
