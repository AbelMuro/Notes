const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


app.use('/login', createProxyMiddleware({
    target: "http://localhost:6000",
    changeOrigin: true
}))
app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(5000);
