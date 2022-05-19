const axios = require('axios').default;

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "27514319-3f71a34bdf3e844d254f7bad1";
const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export class PictureApiService {
    constructor() {

    }
    fetchPictures() {

      
        axios.get(`${BASE_URL}/?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`)
            .then(({data}) => data)
    }
}

