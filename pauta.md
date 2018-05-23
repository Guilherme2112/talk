## Intro
 - Olar, essa é a 1a talk de uma série de não muitas que virão quando Deus quiser, nela eu vou percorrer alguns conteúdos que servirão de base para que as novidades do ES2018 sirvam para alguma coisa e impactem na sua vida.
 - Disclaimer: Essa talk é voltada para pessoas com o mínimo de conhecimento em js.

## Então...veio a era dos callbacks( Era síncrona)
 - Nos primórdios da WEB, tudo ocorria de forma síncrona, isso é, com mensagem-resposta ocorrendo de forma ordenada e sequencial
 - Era mais fácil de gerenciar, porém, limitava as possibilidades dos devs.
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
 - Promise.race e Promise.all

## Era assíncrona 2: Generators
 - Funcionam como funções pausáveis
   - mostrar o porque
 - O uso delas gera iterators de seus yields
 [NAO SE EXTENDER AQUI]

## Era assíncrona 3: Async functions
 - São funções assíncronas(ué)
 - Dentro delas, é possível, usar a keyword `await promise`, onde promise é uma Promise(ué).
 - await bloqueia a execução da function até que a promise seja resolvida:
 - Dentro delas, é possível acessar o resultado de promises fora dos handlers.
  [ exemplo ]

 - As async functions abriram algumas possibilidades, como:
  - Escrever código assíncrono que parece síncrono
  - Tratamento de erros com try/catch simples (fora dos handlers das promises)
  - A segunda possibilidade reforça a primeira
  - facilita o paralelismo

## Async iterator
 - Relembrar os generators da era assíncrona 2
 - Iterators normais(de gente) já existiam
 - Agora (no ES2018) é possível iterar em fontes assíncronas(Promises) de dados
 - Úteis em conjunto com async functions
 -BEHOLD THE FUTURE
  [exemplo] WHERE IS UR GOD NOW?
