import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
   ) {}

   @Post('login')
   @UseGuards(LocalAuthGuard)
   async login(@Body() params, @Request() req) {
      return await this.authService.login(req.user);
   }

   @Post('refresh')
	async refreshToken(@Body() params) {
		return await this.authService.refreshToken(params);
	}
}
