'use strict';

import Frame from '../frame';

describe('Frame View', function() {

  beforeEach(() => {
    this.frame = new Frame();
  });

  it('Should run a few assertions', () => {
    expect(this.frame);
  });

});
