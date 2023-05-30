const casual = require('casual');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  // Generate fake users, posts, and comments
  const users = [];
  const posts = [];

  // Create users
  for (let i = 0; i < 5; i++) {
    const user = await User.create({
      username: casual.username,
      password: casual.password,
    });
    users.push(user);
  }

  // Create posts
  for (let i = 0; i < 5; i++) {
    const user = users[casual.integer(0, users.length - 1)];

    const post = await Post.create({
      title: casual.title,
      content: casual.sentences(3),
      user_id: user.id,
    });
    posts.push(post);
  }

  // Create comments
  for (const post of posts) {
    for (let i = 0; i < 2; i++) {
      const user = users[casual.integer(0, users.length - 1)];

      await Comment.create({
        comment_text: casual.sentences(2),
        user_id: user.id,
        post_id: post.id,
      });
    }
  }

  console.log('Seed data generated successfully.');
};

seedDatabase();
