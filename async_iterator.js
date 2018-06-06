function firstMessage() {
  return fetch('http://127.0.0.1:3000/kk')
}
function secondMessage() {
  return fetch('http://127.0.0.1:3000/eae')
}
function thirdMessage() {
  return fetch('http://127.0.0.1:3000/men')
}

async function demo() {
  const responses = await Promise.all([firstMessage(), secondMessage(), thirdMessage()])
  //Async iterator: WHERE IS YOUR GOD NOW?
  for await(const response of responses) {
    response_body = await response.json();
    appendMarquee(response_body.message);
  }
}

function appendMarquee(text) {
  var marquee = document.createElement("marquee");
  var marquee_content = document.createTextNode(text);
  marquee.appendChild(marquee_content);

  var container = document.getElementsByClassName("container")[0];
  container.appendChild(marquee);
}
