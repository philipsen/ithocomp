import { TestBed, inject } from '@angular/core/testing';

import { RemoteCommandService } from './remote-command.service';

describe('RemoteCommandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoteCommandService]
    });
  });

  it('should be created', inject([RemoteCommandService], (service: RemoteCommandService) => {
    expect(service).toBeTruthy();
  }));
});
