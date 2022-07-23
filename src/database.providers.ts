import { Sequelize } from 'sequelize-typescript';
import { PostModel } from '#core/posts';
import { UserModel } from '#core/users';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'posterr',
      });
      sequelize.addModels([PostModel, UserModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
