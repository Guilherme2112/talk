async function sequentialUse(params) {
  x = await demora2s();
  y = await demora4s();
  console.log(x)
  console.log(y)
}

function demora4s() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Demorei 4s');
    }, 4000);
  });
}

function demora2s() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve('Demorei 2s');
    }, 2000);
  });
}
sequentialUse()

// Explicar por que de se usar formas diferentes de declarar variáveis (problema de performance ao sequenciar reqests com await)
function firstMessage() {
  return fetch('http://127.0.0.1:3000/kk').then(x=>x.json());
}
function secondMessage() {
  return fetch('http://127.0.0.1:3000/eae').then(x=>x.json());
}
function thirdMessage() {
  return fetch('http://127.0.0.1:3000/men').then(x=>x.json());
}

async function test() {
  try {
    responses =  await Promise.all([firstMessage(), secondMessage(), thirdMessage()]);
    return responses
  }
  catch (err) {
    return { message: err.message }
  }
}

async function printResults() {
  try {
    objects = await test();
    objects.map(function (object) { console.log(object.message)})
  } catch (err) {
    console.error(err.message)
  }
}
