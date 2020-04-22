const koa = require('koa');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const { connect, initSchemas, initAdmin } = require('./database/init');
const router = require('./routes');

const app = new koa();

const host = process.env.host || '127.0.0.1';
const port = process.env.port || 3000;

let config = require('../nuxt.config');

config.dev = app.env !== 'production';

async function start() {
  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  await connect();
  initSchemas();
  await initAdmin();

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.use(ctx => {
    ctx.status = 200;

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve);
      ctx.res.on('finish', resolve);
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject);
      });
    });
  });

  app.listen(port, host);

  consola.ready({
    message: `Server listening on http://${host}:${port}/`,
    badge: true,
  });
}

start();
