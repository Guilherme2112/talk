describe('Generator', () => {

  describe('behaves as a factory of iterators objects', () => {
    function *generator() {};

    it('returns an iterator object', () => {
      expect(generator().next).toEqual(jasmine.any(Function));
    });

    it('returns different iterator instances for each call', () => {
      expect(generator()).not.toBe(generator());
    });
  });

  describe('#next', () => {
    describe('when the generator has a return', () => {
      let returnedObject;
      function *generator() { return 10; };

      beforeEach(() => {
        let iterator = generator();
        returnedObject = iterator.next();
      });

      it('returns an object as { value: <return-value>, done: true}', () => {
        expect(returnedObject.value).toBe(10);
        expect(returnedObject.done).toBe(true);
      });
    });

    describe('when the generator has multiples returns', () => {
      let iterator;
      let returnedObject;
      let returnedValues = [1, 10, 100];

      function *generator() {
        for (var i = 0; i < returnedValues.length; i++) {
          return returnedValues[i];
        }
      };

      beforeEach(() => {
        iterator = generator();
        returnedObject = iterator.next();
      });

      it('returns an object as { value: <first-return-value>, done: true}', () => {
        expect(returnedObject.value).toBe(returnedValues[0]);
        expect(returnedObject.done).toBe(true);
      });

      it('any subsequence call returns an object as { value: undefined, done: true}', () => {
        for (var i = 0; i < 100; i++) {
          expect(iterator.next().value).toBe(undefined);
          expect(iterator.next().done).toBe(true);
        }
      });
    });

    describe('when the generator does not returns any value', () => {
      let returnedObject;
      function *generator() {};

      beforeEach(() => {
        let iterator = generator();
        returnedObject = iterator.next();
      });

      it('returns an object as { value: undefined, done: true}', () => {
        expect(returnedObject.value).toBe(undefined);
        expect(returnedObject.done).toBe(true);
      });
    });

    describe('when the generator has a yield', () => {
      let returnedObject;
      function *generator() { yield 10; };

      beforeEach(() => {
        let iterator = generator();
        returnedObject = iterator.next();
      });

      it('returns an object as { value: <yield-value>, done: false}', () => {
        expect(returnedObject.value).toBe(10);
        expect(returnedObject.done).toBe(false);
      });
    });

    describe('when the generator has multiples yields', () => {
      let iterator;
      let yieldValues = [1, 10, 100];

      function *generator() {
        for (var i = 0; i < yieldValues.length; i++) {
          yield yieldValues[i];
        }
      };

      beforeEach(() => { iterator = generator(); });

      it('returns an object as { value: <yield-value>, done: false} for each yield value', () => {
        yieldValues.forEach(value => {
          let returnedObject = iterator.next();

          expect(returnedObject.value).toBe(value);
          expect(returnedObject.done).toBe(false);
        });
      });

      it('any subsequence call returns an object as { value: undefined, done: true}', () => {
        for (var i = 0; i < yieldValues.length; i++) iterator.next();

        let returnedObject = iterator.next();

        expect(returnedObject.value).toBe(undefined);
        expect(returnedObject.done).toBe(true);
      });
    });

    describe('when the generator has mixed yields and returns', () => {
      let iterator;
      let values = [1, 10];

      function *generator() {
        for (var i = 0; i < values.length; i++) yield values[i];
        for (var i = 0; i < values.length; i++) return values[i];
        for (var i = 0; i < values.length; i++) yield values[i];
      };

      beforeEach(() => { iterator = generator(); });

      it('yields values are returned as expected', () => {
        values.forEach(value => {
          let returnedObject = iterator.next();

          expect(returnedObject.value).toBe(value);
          expect(returnedObject.done).toBe(false);
        });
      });

      it('the first return value ends with the iterations', () => {
        values.forEach(value => { iterator.next(); });

        let returnedObject = iterator.next();

        expect(returnedObject.value).toBe(1);
        expect(returnedObject.done).toBe(true);
      });

      it('any subsequence call returns an object as { value: undefined, done: true}', () => {
        values.forEach(value => { iterator.next(); });
        iterator.next();

        for (var i = 0; i < 100; i++) {
          let returnedObject = iterator.next();

          expect(returnedObject.value).toBe(undefined);
          expect(returnedObject.done).toBe(true);
        }
      });
    });
  });

  describe('yield', () => {
    describe('can break normal control flux', () => {
      let iterator;
      function *generator() {
        yield 5;
        throw new Error('End of generator function');
        yield 50;
      };

      beforeEach(() => { iterator = generator(); });

      it('pauses the generator function execution', () => {
        expect(() => { iterator.next(); }).not.toThrow();
      });

      it('resumes the generator function execution with another #next call', () => {
        expect(() => { iterator.next(); }).not.toThrow();
        expect(() => { iterator.next(); }).toThrow(new Error('End of generator function'));
      });
    });

    it('receives the value passed to the #next call', () => {
      function *generator() {
        expect(yield).toBe(123);
      };
      let iterator = generator();

      iterator.next(123);
    });
  });

  describe('can be used to create fibonnaci sequences', () => {
    function *fibonnaci(n = Infinity) {
      let current = 0;
      let next = 1;

      while(n-- && current != Infinity) {
        yield current;

        [current, next] = [next, current + next];
      }
    }

    it('can generate fibonnaci sequences', () => {
      let [...sequence] = fibonnaci(10);

      let lastElement = sequence[sequence.length - 1];

      expect(lastElement).toBe(34);
    });

    it('can generate all fibonnaci element until 1477th', () => {
      let fibonnaciSequence = fibonnaci();
      let lastElement;
      let i = 0;

      for (let member of fibonnaciSequence) {
        lastElement = member;
        i++;
      }

      expect(lastElement).toBe(1.3069892237633987e+308);
      expect(i).toBe(1477);
    });
  });

  describe('can be used for async functions', () => {
    it('defines a main function that looks synchronous', (done) => {
      function *makeMultiplesRequests() {
        let isLogged = yield asyncRequest(false);
        expect(isLogged).toBe(false);

        let products = yield asyncRequest('product list');
        expect(products).toBe('product list');

        done();
      }

      function asyncRequest(value) {
        setTimeout(() => { generator.next(value); }, 0);
      }

      let generator = makeMultiplesRequests();

      generator.next();
    });

    it('combined with promises can to make asynchronous code looks synchronous', () => {
      function handleGenerator(generator) {
        let iterator = generator();

        (function iterate(value) {
          let yielded = iterator.next(value);

          if (!yielded.done) {
            let promise = yielded.value;
            promise.then(iterate);
          }
        })();
      }

      function asyncRequest(value) {
        return new Promise(resolve => {
          setTimeout(() => { resolve(value); }, 0);
        });
      }

      function *fakeSynchronousFunction() {
        let token = yield asyncRequest(123);
        expect(token).toBe(123);

        let users = yield asyncRequest('users');
        expect(users).toBe('users');

        let admins = yield asyncRequest('admins');
        expect(admins).toBe('admins');

        done();
      }

      handleGenerator(fakeSynchronousFunction);
    });
  });
});
