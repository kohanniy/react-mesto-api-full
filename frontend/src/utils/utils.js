//Обработка ошибок, попадающих в catch
export function rejectPromise(err) {
  console.log(err);
}

// Прекращение передачи текущего события
export function handleStopPropagation(e) {
  e.stopPropagation();
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}
