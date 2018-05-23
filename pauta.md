## Intro
 - Blabla ES2018 parte 1,

## Então...veio a era dos callbacks( Era síncrona)
 - Códigos horrendos com funções aninhadas (CallBack hell)
 - Difícil de gerenciar, na medida que o código  crescia
   [ exemplo ]

## Era assíncrona 1: Promises
 - Promises: Podem ser entendidas como um uma 'promessa' de um value a ser obtido
 - Permitem tratar os fluxos através dos `then` e `catch`
  - then: caso feliz, catch: deu ruim
  - Cada um desses `then` e `catch` retornam uma nova promise.
   [ exemplo ]
 - Melhor que a anterior, e dá possibilidades interessantes, mas ainda depende de callbacks (then e catch).

## Era assíncrona 2: Generators
 - Funcionam como funções pausáveis
   - mostrar o porque
 - O uso delas gera iterators de seus yields

## Era assíncrona 3: Async functions
 - São funções assíncronas(ué)
 - Dentro delas, é possível, usar a keyword `await promise`, onde promise é uma Promise(ué).
 - await bloqueia a execução da function até que a promise seja resolvida:
  [ exemplo ]

 - As async functions abriram algumas possibilidades, como:
  - paralelismo
  - Tratamento de erros com try/catch simples
  - Escrever código assíncrono que parece síncrono

## Async iterator
 - Relembrar os generators da era assíncrona 2
 - Iterators normais(de gente) já existiam
 - Agora (no ES2018) é possível iterar em fontes assíncronas(Promises) de dados
  [exemplo] WHERE IS UR GOD NOW?
