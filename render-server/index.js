const renderServer = require('./server');
const app = renderServer({
    useProxy: true,
    useMicroCache: process.env.MICRO_CACHE !== 'false'
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});