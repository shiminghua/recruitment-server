const mongoose = require('mongoose');
const db = 'mongodb://localhost/flutter-boss';
const glob = require('glob');
const { resolve } = require('path');

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

exports.initAdmin = async () => {
  const User = mongoose.model('User');
  let user = await User.findOne({
    username: 'flutter',
  });

  if (!user) {
    const user = new User({
      username: 'flutter',
      email: 'shiminghua2008@qq.com',
      password: 'flutter',
      role: 'admin',
    });
  }
};

exports.connect = () => {
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose.connect(db);

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++;

      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了，快去修吧少年！');
      }
    });

    mongoose.connection.on('error', (err) => {
      console.log(err);
      maxConnectTimes++;

      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了吧，快去修吧少年')
      }
    });

    mongoose.connection.on('open', () => {
      resolve();
      console.log('MongoDB connected successfully!');
    });
  });
};
