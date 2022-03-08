const express = require('express');
const req = require('express/lib/request');
const app = express();
const port = 3000;
const checkListRouter = require('./src/routes/checklist');
const path = require('path');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override');


require('./config/database');
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/checklists', checkListRouter);
app.use('/', rootRouter);


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}/`);
});