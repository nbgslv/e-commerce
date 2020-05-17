const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
  database: 'mongodb://localhost:27017/graphql-app',
  dropDatabase: true,
};
const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('.'));

seeder
  .import(collections)
  .then(() => {
    console.log('Seeding succeeded');
  })
  .catch(err => {
    console.log(err);
  });
