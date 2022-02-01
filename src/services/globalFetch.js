function globalFetch(URL) {
  try {
    return fetch(URL)
      .then((result) => result.json())
      .then((json) => json);
  } catch (e) { console.log(e); }
}

export default globalFetch;
