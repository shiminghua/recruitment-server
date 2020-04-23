const Router = require('koa-router');
const mongoose = require('mongoose');
const koaBody = require('koa-body');

const router = new Router();

// 查询用户
router.post('/api/user', async (ctx, next) => {
  const username = ctx.query.username;
  const password = ctx.query.password;
  const userDB = mongoose.model('User');
  const user = await userDB.findOne({ username: username, password: password });

  ctx.body = {
    data: {
      user,
    }
  };
});

// 职位列表
router.get('/api/jobs/list/:page', async (ctx, next) => {
  const curPage = Number(ctx.params.page);
  const pageSize = 10;
  const Job = mongoose.model('Job');
  const total = await Job.find({}).count();
  const totalPage = Math.floor((total + pageSize - 1) / pageSize);
  const hasNextPage = curPage < totalPage ? true : false;
  const jobs = await Job
    .find({})
    .sort({
      'meta.createdAt': -1,
    })
    .skip((curPage - 1) * pageSize)
    .limit(pageSize);

  ctx.body = {
    data: {
      jobs,
      pages: {
        curPage,
        total,
        totalPage,
        hasNextPage,
      }
    },
  };
});

// 公司列表
router.get('/api/company/list/:page', async (ctx, next) => {
  const curPage = Number(ctx.params.page);
  const pageSize = 10;
  const Company = mongoose.model('Company');
  const total = await Company.find({}).count();
  const totalPage = Math.floor((total + pageSize - 1) / pageSize);
  const hasNextPage = curPage < totalPage ? true : false;
  const companies = await Company
    .find({})
    .sort({ 'meta.createdAt': -1 })
    .skip((curPage - 1) * pageSize)
    .limit(pageSize);

  ctx.body = {
    data: {
      companies,
      pages: {
        curPage,
        total,
        totalPage,
        hasNextPage,
      }
    }
  };
});

router.get('/api/companyDetail/list/:page', async (ctx, next) => {
  const curPage = Number(ctx.params.page)
  const pageSize = 10
  const Company = mongoose.model('CompanyDetail')
  const total = await Company.find({}).count()
  const totalPage = Math.floor((total + pageSize - 1) / pageSize)
  const hasNextPage = curPage < totalPage ? true : false
  const companies = await Company.find({}).sort({
    'meta.createdAt': -1
  }).skip((curPage - 1) * pageSize).limit(pageSize)

  ctx.body = {
    'data': {
      companies,
      'pages': {
        curPage,
        totalPage,
        hasNextPage,
        total
      }
    }
  }
});

router.get('/api/companyDetail/all', async (ctx, next) => {
  const Company = mongoose.model('CompanyDetail')
  const companyDetails = await Company.find({})

  ctx.body = {
    'data': {
      companyDetails
    }
  }
});

// 公司详情
router.get('/api/companyDetail/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const CompanyDetail = mongoose.model('CompanyDetail');
  const companyDetail = await CompanyDetail.findOne({ _id: id });

  ctx.body = {
    data: {
      companyDetail,
    }
  };
});

// 保存消息
router.post('/api/messages', koaBody(), async (ctx, next) => {
  ctx.body = JSON.stringify(ctx.request.body);
  let { name, message, head, time } = ctx.request.body;
  const Message = mongoose.model('Message');

  let msg = new Message({
    id: Date.now() + '',
    name,
    message,
    head,
    time,
  });

  await msg.save();
});

router.get('/api/messages/find', async (ctx, next) => {
  const Message = mongoose.model('Message');
  const messages = await Message.find({}).sort({ 'meta.createdAt': -1 });
  ctx.body = {
    data: {
      messages3
    }
  };
});

module.exports = router;
