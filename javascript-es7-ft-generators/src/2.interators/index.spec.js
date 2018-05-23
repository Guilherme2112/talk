describe('Iterator', () => {

  it('is returned by the generator function call', () => {
    function *generator() {};

    expect(generator().constructor.name).toEqual('GeneratorFunctionPrototype');
  });

  it('is an object with a "next" function property', () => {
    function *generator() {};

    expect(generator().next).toEqual(jasmine.any(Function));
  });

  it('defines how to iterate over an object struct', () => {
    let object = { a: 1, b: 10, c: 100 };

    object[Symbol.iterator] = function* () {
      yield 1;
      yield 10;
      yield 100;
    }

    let expectedValue = 1;

    for (let value of object) {
      expect(value).toBe(expectedValue);
      expectedValue *= 10;
    }
  });

  describe('can be redefined for any object', () => {
    const VALUES = [1, 'a', [], {b: 1}];
    function* customIterator() {
      for (var i = 0; i < VALUES.length; i++) yield VALUES[i];
    }

    const OBJECTS = [
      new Object(),
      new Array(9,9,9),
      new Number(1),
      new String('Hello world'),
      new Error(),
      new RegExp(),
      new Promise(() => {}),
      new Map(),
      new Set(),
      Symbol(),
      (new (class AnyClass {}))
    ];

    OBJECTS.forEach(object => {
        object[Symbol.iterator] = customIterator;

        describe(`with custom iterator for object: ${object.constructor.name}`, () => {
          it('iterator over the custom iterator', () => {
            let index = 0;
            for (let value of object) {
              expect(value).toBe(VALUES[index]);
              index++;
            }
          });
        });
      });
  });
});
