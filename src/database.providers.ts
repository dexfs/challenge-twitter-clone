import { Sequelize } from 'sequelize-typescript';
import { PostModel } from '#core/posts';
import { UserModel } from '#core/users';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get('pg.dsn'), {
        dialect: configService.get('pg.dialect'),
      });
      sequelize.addModels([PostModel, UserModel]);
      // await sequelize.sync();
      return sequelize;
    },
  },
];
