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
   create(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
   }

   @Get()
   @UseGuards(JwtAuthGuard,PermissionsGuard)
   @Permissions('user:get')
   async findAll() {
      const result = await this.usersService.findAll();
      throw new HttpException(result, result.statusCode);
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(+id, updateUserDto);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
   }
}
