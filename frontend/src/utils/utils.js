//Обработка ошибок, попадающих в catch
export function rejectPromise(err) {
  console.log(err);
}

// Прекращение передачи текущего события
export function handleStopPropagation(e) {
  e.stopPropagation();
}
