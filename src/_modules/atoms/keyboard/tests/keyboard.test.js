'use strict';

import Keyboard from '../keyboard';

describe('Keyboard View', function() {

  beforeEach(() => {
    this.keyboard = new Keyboard();
  });

  it('Should run a few assertions', () => {
    expect(this.keyboard);
  });

});
