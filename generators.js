//Generator é uma função que é pausável, pois sua execução pode ser congelada no yield até que o método next() seja chamado.
function* generator() {
  yield 1
  yield 2
  yield 3
  yield 4
  console.log('pronto')
}

x = generator()

console.log(x.next())
console.log(x.next())
console.log(x.next())
console.log(x.next())
// A próxima chamada imprimirá o 'pronto'
