async function globalFetch(URL) {
  try {
    return (await fetch(URL)).json();
  } catch (e) { console.log(e); }
}

export default globalFetch;
