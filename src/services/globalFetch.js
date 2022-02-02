async function globalFetch(URL) {
  try {
    const requist = await fetch(URL);
    const response = await requist.json();
    return response;
  } catch (e) { console.log(e); }
}

export default globalFetch;
