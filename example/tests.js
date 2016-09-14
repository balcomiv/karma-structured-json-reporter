// Example tests

describe('A suite', function () {
  it('has a test that passes', function () {
    expect(true).toBe(true);
  });

  it('has a test that fails', function () {
    expect(true).toBe(false);
  });

  describe('with a nested suite', function () {
    it('also has a test', function () {
      expect(true).toBe(true);
    });
  });
});