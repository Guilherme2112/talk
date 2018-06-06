async function sequentialUse(params) {
  res = Promise.all([demora2s(),demora4s()])
  console.log(res[1])
  console.log(res[2])
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
    var objects = await performRequest(); //await 'aguarda' a resolução da promise
  } catch (err) { // A rejeição de uma promise em uma async function dispara exception
    console.error(err.message)
  }
  //Async functions sempre retornam promises.
}

async function test() {
  for await (const x of arr) {
    console.log(x)
  }
}



- Mais figuras
- Dúvidas separado e antes do obg
- Trocar temas por agenda
- Deixar o cógido preparado
- Treinar no espelho
- Falar alto
- Não cruzar os braços
- Colocar figuras
- Colocar slides p / async iterator

- Colocar vantagens e desvantagens de cada solução
