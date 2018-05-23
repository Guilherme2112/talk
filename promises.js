// Essa Promise será resovida após 2s
function vaiDarBom() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve('deu bom');
    }, 2000);
  });
}

//Essa Promise será rejeitada após 4s
function vaiDarRuim() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('deu ruim');
    }, 4000);
  });
}
//Usa-se o handler 'then' para tratar o caso feliz
gaveGoodResult = vaiDarBom().then(result => console.log(result))

//Usa-se o handler 'catch' para tratar o caso infeliz
gaveBadResult = vaiDarRuim().catch(result => console.error(result))

//Promise hell
fetchBook()
  .then((book) => {
    return formatBook(book)
      .then((book) => {

        return sendBookToPrinter(book);
      });
  });


  //Criar exemplos de Promise.all e Promise.race
