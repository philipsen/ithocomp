import { IthoStateModule } from './itho-state.module';

describe('IthoStateModule', () => {
  let ithoStateModule: IthoStateModule;

  beforeEach(() => {
    ithoStateModule = new IthoStateModule();
  });

  it('should create an instance', () => {
    expect(ithoStateModule).toBeTruthy();
  });
});
