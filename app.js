const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const methodOverride = require("method-override");

const publicPatch = path.resolve(__dirname, "./public");

app.use(express.static(publicPatch));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

//Le indicamos a express el requerimiento de rutas
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

app.use('/users', userRouter);
app.use('/', homeRouter);
app.use('/products', productRouter);
app.use((req, res, next) => {
    res.status(404).render('error404');                                         
});

app.listen(port || 3030, () => {
    console.log("El servidor está corriendo con éxito");
});