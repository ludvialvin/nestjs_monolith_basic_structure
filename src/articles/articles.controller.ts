import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
   constructor(private readonly articlesService: ArticlesService) {}

   @Post()
   async create(@Body() createArticleDto: CreateArticleDto) {
      const result = await this.articlesService.create(createArticleDto);
      throw new HttpException(result, result.statusCode);
   }

   @Get()
   async findAll() {
      const result = await this.articlesService.findAll();
      throw new HttpException(result, result.statusCode);
   }

   @Get(':id')
   async findOne(@Param('id') id: string) {
      const result = await this.articlesService.findOne(+id);
      throw new HttpException(result, result.statusCode);
   }

   @Patch(':id')
   async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
      const result = await this.articlesService.update(+id, updateArticleDto);
      throw new HttpException(result, result.statusCode);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.articlesService.remove(+id);
   }
}
