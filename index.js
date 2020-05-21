//Load express module with `require` directive
var express = require('express')
var app = express()
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require('mongoose'); // Utilizamos la librería de mongoose
const Usuario = require('./usuarios')


const db_link = "mongodb://mongo:27017/usuarioddb";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(db_link, options).then(function () {
    console.log('MongoDB is connected');
})
    .catch(function (err) {
        console.log(err);
    });

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
*         '500':
*           description: Error in server
*/
app.get('/usuarios', function (req, res) {
    Usuario.find(function (err, usuarios) {
        if (err) {
            return res.status(500)
        }
        return res.status(200).json(usuarios);

    });

})

/**
 * @swagger
 * /usuarios:
 *  post:
 *    description: Crear usuario
 *    parameters:
 *      - name: usuario
 *        description: Usuario object
 *        in: body
 *        type: object
 *        required: true
 *    responses:
 *      '201':
 *        description: creacion exitosa
 *      '500':
 *        description: Error in server
 */
app.post('/usuarios', function (req, res) {
    var usuarioNuevo = req.body;
    try {
        let usuario = new Usuario(usuarioNuevo);
        usuario.save();
        return res.status(201).json(usuario);
    }

    catch (err) {
        return res.status(500)
    }
});
/**
* @swagger
* /usuarios/{id}:
*  put:
*    description: Actualizar usuario
*    parameters:
*      - name: id
*        in: path
*        required: true
*        type: string
*      - name: User
*        in: body
*        type: object
*    produces: 
*      - application/json
*    responses:
*      '201':
*        description: usuario actualizado
*      '500':
*        description: Error in server
*        content:
*          type: object
*/
app.put('/usuarios/:id', async function (req, res, next) {
    var usuarioId = req.params.id;
    try {
        let usuarioUp = req.body;
        let usuario = await Usuario.findByIdAndUpdate(usuarioId, usuarioUp, { new: true });
        return res.status(201).json(usuario);
    }
    catch (err) {
        return res.status(500)
    }
})

/**
* @swagger    
* /usuarios/{id}:
*  delete:
*    description: Eliminar un usuario
*    parameters:
*      - name: id
*        in: path
*        required: true
*        type: string
*    responses:
*      '200':
*        description: Usuario eliminado'
*      '500':
*        description: Error in server
*        content:
*          type: object
*/
app.delete('/usuarios/:id', async function (req, res, next) {
    let usuarioId = req.params.id;
    try{
        let usuario = await Usuario.findByIdAndRemove(usuarioId);
        return res.status(200).json(usuario);
    }
    catch (err) {
        return res.status(500)
    }
})






