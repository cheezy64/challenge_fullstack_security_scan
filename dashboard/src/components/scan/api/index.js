export const getScanList = async (filters = {}) => {
  const { repo } = filters;
  const request = repo
    ? window.encodeURI(`http://localhost:5000/api/scan/list?repo=${repo}`)
    : window.encodeURI('http://localhost:5000/api/scan/list');
  
  const response = await fetch(request);

  return response.json();
};

export const getScanResult = async (id) => {
  const response = await fetch(`http://localhost:5000/api/scan/result/${id}`);
  return response.json();
};

export const postScanResult = async (formData) => {
  const response = await fetch('http://localhost:5000/api/scan/result', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });

  return response.json();
};

