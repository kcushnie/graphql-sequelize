import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} from 'graphql';
import * as db from '../db/schema';

const Comment = new GraphQLObjectType({
    name: 'Comment',
    description: 'This represents a comment',
    fields: () => {
        return {
            rating: {
                type: GraphQLInt,
                resolve(comment) {
                    return comment.rating
                }
            },
            message: {
                type: GraphQLString,
                resolve(comment) {
                    return comment.message
                }
            },
            author: {
                type: GraphQLString,
                resolve(comment) {
                    return comment.getPerson().firstName
                }
            }
        }
    }
});

const Person = new GraphQLObjectType({
    name: 'Person',
    description: 'This represents a Person',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(person) {
                    return person.id;
                }
            },
            firstName: {
                type: GraphQLString,
                resolve(person) {
                    return person.firstName;
                }
            },
            lastName: {
                type: GraphQLString,
                resolve(person) {
                    return person.lastName;
                }
            },
            email: {
                type: GraphQLString,
                resolve(person) {
                    return person.email;
                }
            },
            posts: {
                type: new GraphQLList(Post),
                resolve(person) {
                    return person.getPosts();
                }
            }
        };
    }
});

const Post = new GraphQLObjectType({
    name: 'Post',
    description: 'This represents a Post',
    fields: () => {
        return {
            id: {
                type: GraphQLInt,
                resolve(post) {
                    return post.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(post) {
                    return post.title;
                }
            },
            content: {
                type: GraphQLString,
                resolve(post) {
                    return post.content;
                }
            },
            author: {
                type: Person,
                resolve(post) {
                    return post.getPerson()
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            people: {
                type: new GraphQLList(Person),
                args: {
                    id: { type: GraphQLInt },
                    email: { type: GraphQLString }

                },
                resolve(root, args) {
                    return db.Person.findAll({ where: args })
                }
            },
            posts: {
                type: new GraphQLList(Post),
                args: {},
                resolve(root, args) {
                    return db.Post.findAll({ where: args })
                }
            }
        };
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: '',
    fields: () => {
        return {
            addPerson: {
                type: Person,
                args: {
                    firstName: { type: new GraphQLNonNull(GraphQLString) },
                    lastName: { type: new GraphQLNonNull(GraphQLString) },
                    email: { type: new GraphQLNonNull(GraphQLString) },
                },
                resolve(_, args) {
                    return db.Person.create(args)
                }
            }
        }
    }
})

const Schema = new GraphQLSchema(
    {
        query: Query,
        mutation: Mutation
    }
);

export default Schema;