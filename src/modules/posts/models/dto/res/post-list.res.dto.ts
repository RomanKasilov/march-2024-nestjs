import { PostsQueryDto } from '../req/posts-query.dto';
import { PostResDto } from './post.res.dto';

export class PostListResDto extends PostsQueryDto {
  data: PostResDto[];
  total: number;
}
