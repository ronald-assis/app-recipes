async function globalFetch(URL) {
  try {
    return (await fetch(URL)).json();
  } catch (erro) {
    console.log(erro);
    return {};
  }
}

export default globalFetch;
