import {expect} from 'chai';
import {squareFn} from '../../src/components/helloWorld/helloWorld';


describe('helloWorld component test', () => {

  it('calculate the square of a valid integer.', () => {
    let value = squareFn(5);

    expect(value).to.equal(25);
  });

});
