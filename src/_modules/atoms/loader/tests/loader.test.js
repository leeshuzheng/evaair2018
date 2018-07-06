'use strict';

import Loader from '../loader';

describe('Loader View', function() {

  beforeEach(() => {
    this.loader = new Loader();
  });

  it('Should run a few assertions', () => {
    expect(this.loader);
  });

});
