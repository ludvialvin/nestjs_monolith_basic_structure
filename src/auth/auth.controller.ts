import { Controller, Post, Body, UseGuards, Request, HttpStatus } from '@nestjs/common';
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
	async refreshToken(@Body() params, @Request() request) {
		const res =  await this.authService.refreshToken(params);
      if(res.statusCode == HttpStatus.OK){
         request.session.permissions = res.userPermissions;
         return {
            statusCode: res.statusCode,
            status: res.status,
            access_token: res.access_token,
            refresh_token: res.refresh_token,
         }
      }
      return res
	}
}
