import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import CreatePost from '#core/posts/application/create-post';

@Controller('posts')
export class RepostController {
  @Inject(CreatePost.UseCase)
  private readonly createPostUseCase;

  @Post('repost/:postId')
  create(@Param('postId') postId: string, @Body() repostBody: CreatePostDto) {
    return this.createPostUseCase.execute(repostBody);
  }
}
