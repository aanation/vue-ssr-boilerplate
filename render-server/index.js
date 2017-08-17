const renderServer = require('./server');
const app = renderServer({
    useProxy: true
});

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
});