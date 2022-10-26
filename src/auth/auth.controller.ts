import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
   ) {}

   @Post('login')
   @UseGuards(LocalAuthGuard)
   async login(@Request() request) {
      request.session.permissions = request.session.permissions ? request.session.permissions : request.user.permissions;
      return await this.authService.login(request.user);
   }

   @Post('refresh')
	async refreshToken(@Body() params) {
		return await this.authService.refreshToken(params);
	}
}
