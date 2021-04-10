import { Test } from '@nestjs/testing';
import { ServerAuthService } from './server-auth.service';

describe('ServerAuthService', () => {
  let service: ServerAuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerAuthService],
    }).compile();

    service = module.get(ServerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
