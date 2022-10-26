import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorator/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   @Post()
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:create')
   async create(@Body() createUserDto: CreateUserDto) {
      const result = await this.usersService.create(createUserDto);
      throw new HttpException(result, result.statusCode);
   }

   @Get()
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:get')
   async findAll() {
      const result = await this.usersService.findAll();
      throw new HttpException(result, result.statusCode);
   }

   @Get(':id')
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:get')
   async findOne(@Param('id') id: string) {
      const result = await this.usersService.findOne(+id);
      throw new HttpException(result, result.statusCode);
   }

   @Patch(':id')
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:update')
   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const result = await this.usersService.update(+id, updateUserDto);
      throw new HttpException(result, result.statusCode);
   }

   @Delete(':id')
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:delete')
   async remove(@Param('id') id: string) {
      const result = await this.usersService.remove(+id);
      throw new HttpException(result, result.statusCode);
   }
}
