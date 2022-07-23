import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import CreatePost from '#core/posts/application/create-post';

@Controller('posts')
export class CreateController {
  @Inject(CreatePost.UseCase)
  private readonly createPostUseCase;

  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.createPostUseCase.execute(createPostDto);
  }
}
