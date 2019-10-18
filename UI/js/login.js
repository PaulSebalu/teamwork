/* eslint-disable no-alert */
const routePrefix = 'http://localhost:2000';

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
async function fetchData() {
  const email = document.querySelector('[name="email"]').value;
  const password = document.querySelector('[name="password"]').value;

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const response = await fetch(`${routePrefix}/auth/signin`, {
    method: 'post',
    headers,
    body: JSON.stringify({
      email,
      password
    })
  });
  const data = await response.json();
  return data;
}

// eslint-disable-next-line no-unused-vars
async function signIn() {
  const data = await fetchData();
  if (data.error) alert(data.error);
  if (data.status === 200) {
    localStorage.setItem('employee', JSON.stringify(data));
    window.location.replace('../UI/html/articles.html');
  }
}
