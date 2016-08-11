import { addProviders, inject } from '@angular/core/testing';
import { HelloComponent } from './hello.component';

describe('App', () => {
  beforeEach(() => {
    addProviders([
      HelloComponent
    ]);
  });
  it ('should work', inject([HelloComponent], (hello: HelloComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
});
