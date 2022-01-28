function globalFetch(URL) {
  return fetch(URL)
    .then((result) => result.json())
    .then((json) => json);
}

export default globalFetch;
