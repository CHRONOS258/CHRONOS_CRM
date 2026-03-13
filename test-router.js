import express from 'express';
const app = express();

const testRoute = (route) => {
  try {
    app.get(route, (req, res) => {});
    console.log(`Route "${route}" works!`);
  } catch (e) {
    console.log(`Route "${route}" fails:`, e.message);
  }
};

testRoute('/*');
testRoute('(.*)');
testRoute('*');
testRoute('/{*splat}');
testRoute('/{*}');
