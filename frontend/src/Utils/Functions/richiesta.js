const richiesta = (endpoint, params = {}) => {
  let endUrl = "https://soldo.davidevitiello.dev" + endpoint;
  if (window.location.href.includes("localhost")) {
    endUrl = "http://localhost:3001" + endpoint;
  }

  return fetch(endUrl, params);
};

export default richiesta;
