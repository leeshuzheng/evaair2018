'use strict';

import Takepicture from '../takepicture';

describe('Takepicture View', function() {

  beforeEach(() => {
    this.takepicture = new Takepicture();
  });

  it('Should run a few assertions', () => {
    expect(this.takepicture);
  });

});
