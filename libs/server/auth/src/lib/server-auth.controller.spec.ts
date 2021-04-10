import { Test } from '@nestjs/testing';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';

describe('ServerAuthController', () => {
  let controller: ServerAuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServerAuthService],
      controllers: [ServerAuthController],
    }).compile();

    controller = module.get(ServerAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
