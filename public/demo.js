document.addEventListener('input', debounce(250, editHandler));

function debounce(ms, callback) {
  let interval;
  return function(...args) {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, ms);
  };
}

function editHandler(event) {
  const body = {content: {}}
  body.content[event.target.id] = event.target.textContent;
  fetch('/edited', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.JSON)
    .then(console.log)
    .catch(console.log);
}
