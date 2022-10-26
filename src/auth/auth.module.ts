import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { User, UsersGroup, UserPermission, RefPermissions } from '../users/entities/user.entity';

@Module({
   imports:[
      UsersModule,
      PassportModule,
      JwtModule.register({
         secret: jwtConstants.secret,
         signOptions: { expiresIn: '1000s' },
      }),
      TypeOrmModule.forFeature([Auth]),
      TypeOrmModule.forFeature([User]),
      TypeOrmModule.forFeature([UsersGroup]),
      TypeOrmModule.forFeature([UserPermission]),
      TypeOrmModule.forFeature([RefPermissions])
   ],
   controllers: [AuthController],
   providers: [AuthService,UsersService,LocalStrategy]
})
export class AuthModule {}
