import { addProviders, inject } from '@angular/core/testing';
import { VottingComponent } from './votting.component';

describe('App', () => {
  beforeEach(() => {
    addProviders([
      VottingComponent
    ]);
  });
  it ('should work', inject([VottingComponent], (hello: VottingComponent) => {
    // Add real test here
    expect(2).toBe(2);
  }));
});
