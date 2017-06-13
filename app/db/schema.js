import Person from './person';
import Post from './post';
import Comment from './comment';
import { conn } from './db'
import _ from 'lodash'
import Faker from 'faker'

Person.hasMany(Post);
Post.belongsTo(Person);
Post.hasMany(Comment);
Comment.belongsTo(Person)


export { Person, Post, Comment };

conn.sync({ force: true }).then(() => {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then((person) => {
      return person.createPost({
        title: `Sample title by ${person.firstName}`,
        content: Faker.lorem.paragraph(5)
      });
    });
  });
});