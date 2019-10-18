/* eslint-disable no-alert */
const routePrefix = 'http://localhost:2000';

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
async function fetchData() {
  const firstName = document.querySelector('[name="firstName"]').value;
  const lastName = document.querySelector('[name="lastName"]').value;
  const email = document.querySelector('[name="email"]').value;
  const password = document.querySelector('[name="password"]').value;

  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  const response = await fetch(`${routePrefix}/auth/signup`, {
    method: 'post',
    headers,
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  });
  const data = await response.json();
  return data;
}

// eslint-disable-next-line no-unused-vars
async function signUp() {
  const data = await fetchData();
  if (data.error) alert(data.error);
  if (data.status === 201) {
    localStorage.setItem('employee', JSON.stringify(data));
    window.location.replace('../html/articles.html');
  }
}
