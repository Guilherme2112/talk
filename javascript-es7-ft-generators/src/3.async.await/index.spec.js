describe('Async Await', () => {
  describe('Async functions', () => {
    it('returns a promise when called', () => {
      async function makeRequest() {}

      expect(makeRequest()).toEqual(jasmine.any(Promise));
    });

    describe('when the function returns something', () => {
      async function makeRequest() {
        return 123;
      }

      it('resolves the returned promise', done => {
        makeRequest()
          .then(value => {
            expect(value).toEqual(123);
            done();
          });
      });
    });

    describe('when the function throw something', () => {
      async function makeRequest() {
        throw new Error('something');
      }

      it('catches the error thrown', done => {
        makeRequest()
          .catch(value => {
            expect(value).toEqual(new Error('something'));
            done();
          });
      });
    });
  });

  describe('Await', () => {
    describe('when receive a resolved promise', () => {
      let resolvedPromise = Promise.resolve(123);

      it('returns the resolved value', done => {
        async function test() {
          expect(await resolvedPromise).toBe(123);
        }

        test()
          .then(done);
      });
    });

    describe('when receive a rejected promise', () => {
      let rejectedPromise = Promise.reject('Problem');

      it('reject the async function itself', done => {
        async function test() {
          await Promise.resolve(123);
          await rejectedPromise;
          await Promise.resolve(123);
        }

        test()
          .then(() => {}, message => {
            expect(message).toBe('Problem');
            done();
          });
      });
    });
  });

  describe('Behavior', () => {
    function request(value) {
      return new Promise(resolve => {
        setTimeout(() => { resolve(value); }, 0);
      });
    }

    it('makes asynchronous code looks synchronous', done => {
      async function makeRequest() {
        let data = await request(123);
        expect(data).toBe(123);
        done();
      }

      makeRequest();
    });

    it('does not blocks outside execution code', () => {
      async function makeRequest() {
        await request(123);
        throw 'Request fail!';
      }

      expect(() => { makeRequest(); }).not.toThrow();
    });

    it('can await for others async functions', done => {
      async function request(value) {
        return value;
      }

      async function makeRequest() {
        let value = await request(123);
        expect(value).toBe(123);
        done();
      }

      makeRequest();
    });
  });
});
