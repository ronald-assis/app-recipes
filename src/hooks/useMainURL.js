import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function useMainURL(initalURL) {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [URL, setURL] = useState(initalURL);

  function reducer(type, page, info, direct = false) {
    let newURL;
    switch (type) {
    case 'category':
      newURL = `https://www.${page}.com/api/json/v1/1/filter.php?c=${info}`;
      break;
    case 'ingredient':
      newURL = `https://www.${page}.com/api/json/v1/1/filter.php?i=${info}`;
      break;
    case 'name':
      newURL = `https://www.${page}.com/api/json/v1/1/search.php?s=${info}`;
      break;
    case 'first-letter':
      newURL = `https://www.${page}.com/api/json/v1/1/search.php?f=${info}`;
      break;
    case 'default':
      newURL = `https://www.${page}.com/api/json/v1/1/search.php?s=`;
      break;
    default:
      newURL = false;
      break;
    }

    setURL([newURL, direct]);

    if (pathname === '/foods' || pathname === '/drinks') return;
    push(page === 'themealdb' ? '/foods' : '/drinks');
  }

  return [URL, reducer];
}
