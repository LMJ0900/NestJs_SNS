import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts : PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업을 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 99999999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content: '메이크업을 고치고 있는 해린',
    likeCount: 1000000,
    commentCount: 99999999,
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content: '메이크업을 고치고 있는 로제',
    likeCount: 1000000,
    commentCount: 99999999,
  },
] 

@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository: Repository<PostsModel>
    ){}

    async getAllPosts(){
        return this.postsRepository.find();
    }

    async getPostById(id: number){
        const post = await this.postsRepository.findOne({
          where:{
            id,
          }
        });

        if(post === null){
          throw new NotFoundException();
        }

        return post;
    }

   async createPost(author: string, title: string, content: string){
      // 1) create -> 저장할 객체를 생성한다.
      // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)

      const post = this.postsRepository.create({
        author,
        title,
        content,
        likeCount : 0,
        commentCount : 0,
      })

      const newPost = await this.postsRepository.save(post);

      return newPost
    }

    async updatePost(postId: number, author?: string, title?: string, content?: string){
        // save의 기능
        // 1) 만약에 데이터가 존재하지 않으면 (id 기준으로) 새로 생성
        // 2) 데이터가 존재하면(같은 id 값이 존재한다면) 존재하던 값을 업데이트

        const post = await this.postsRepository.findOne({
          where: {
            id : postId,
          }
        });

        if(!post){
        throw new NotFoundException();
        }
        let change = false

        if(author && author !== post.author){
        post.author = author;
        change = true;
        }

        if(title && title !== post.title){
        post.title = title;
        change = true;
        }

        if(content && content !== post.content){
        post.content = content;
        change = true;
        }

        if(change === true){
          await this.postsRepository.save(post)
          return '값이 변경되었습니다.'
        } else {
          return '변경된 값이 없습니다.'
        }
    }

    async deletePost(postId : number){
        const post = await this.postsRepository.findOne({
          where: {
            id : postId,
          }
        })

        if(!post){
        throw new NotFoundException();
        }

        await this.postsRepository.delete(postId)

        return `id ${postId}번 데이터를 삭제하였습니다.`
    }
}
