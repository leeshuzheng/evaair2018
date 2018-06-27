'use strict';

import Camera from '../camera';

describe('Camera View', function() {

  beforeEach(() => {
    this.camera = new Camera();
  });

  it('Should run a few assertions', () => {
    expect(this.camera);
  });

});
