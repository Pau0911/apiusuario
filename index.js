//Load express module with `require` directive
var express = require('express')
var app = express()
var mongoose = require('mongoose'); // Utilizamos la librería de mongoose

const db_link = "mongodb://mongo:27017/usuarioddb";
const options = {
useNewUrlParser: true,
useUnifiedTopology: true
};
mongoose.connect(db_link, options).then( function() {
console.log('MongoDB is connected');
})
.catch( function(err) {
console.log(err);
});
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
swaggerDefinition: {
    info: {
    title: "HelloWorld API",
    description: "Hello World Class",
    contact: {
    name: "paula"
    },
    servers: ["http://localhost:8081"]
    }
    },
    apis: ["index.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Define request response in root URL (/)
app.get('/', function (req, res) {
res.send('Hello World!')
})
//Launch listening server on port 8081
app.listen(8081, function () {
console.log('app listening on port 8081!')
})
/**
* @swagger
* /usuarios:
*   get:
*       description: Use to request all usuarios
*       responses:
*         '200':
*           description: A successful response
*/
app.get('/usuarios', function (req, res) {
res.status(200).send('Usuario results')
})
/**
* @swagger
* /usuarios:
*   put:
*     description: Use to update a usuarios
*     parameters:
*       - name: usuario
*         in: query
*         description: Name of our usuarios
*         required: false
*         schema:
*           type: string
*           format: string
* responses:
*   '201':
*     description: A successful response
*/
app.put('/usuarios', function (req, res) {
res.status(201).send('Successfully updated usuario')
})





