import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './auth/entities/auth.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { UsersModule } from './users/users.module';
import { User, UsersGroup, UserPermission, RefPermissions } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

const config: SqliteConnectionOptions = {
   type: "sqlite",
   database: "db/db.sqlite3",
   entities: [Auth,User,UsersGroup,UserPermission,RefPermissions,Article],
   synchronize: true
}

@Module({
   imports: [TypeOrmModule.forRoot(config),AuthModule,UsersModule,ArticlesModule],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
