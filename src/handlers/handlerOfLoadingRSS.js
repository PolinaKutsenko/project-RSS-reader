import axios from 'axios';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  console.log('rssurk', rssUrl);
  axios.get(rssUrl)
    .then((response) => {
      console.log('axios');
      console.log(response);
      console.log(typeof response.data.contents);
      console.log('axios');
      const posts = document.querySelector('div.posts');
      posts.innerHTML = response.data.contents;
    })
    .catch((e) => {
      const posts = document.querySelector('div.posts');
      posts.innerHTML = e;
    });
};

export default handlerOfLoadingRSS;
