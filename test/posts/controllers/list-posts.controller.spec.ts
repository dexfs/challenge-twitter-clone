import { ListController } from '../../../src/posts/list.controller';

describe('ListPostsController Unit test', () => {
  let controller: ListController;

  beforeEach(async () => {
    controller = new ListController();
  });

  it('list posts', async () => {
    const mockListPostUseCase = {
      execute: jest.fn().mockReturnValue(null),
    };

    controller['listPostUseCase'] = mockListPostUseCase;
    await controller.get({});
    expect(controller).toBeDefined();
    expect(mockListPostUseCase.execute).toBeCalledTimes(1);
  });
});
