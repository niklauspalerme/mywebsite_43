const redis = require('redis');
const mongo = require('./connectToMongoDB');
var express = require('express');
var app = express();


const redisClient = redis.createClient({
  host: process.env.REDIS_ENDPOINT,
  port: 6379

})

app.get('/', function(req, res) {
  console.log("New request GET to /");
  res.send('Hola Mundo!');
});

app.post('/users', async (req, res) => {
  try {
    await mongo.addNewUser();
    res.sendStatus(200);
  } catch (err) {
    console.error(`Error: `, err.message);
  }
})

app.get('/users', async (req, res) => {
  console.log("New request GET to /users");
  const userRedisKey = "User";
 
  redisClient.get(userRedisKey, async (error, result) => {
    // Si hay error, lo devolvemos
    if (error) {
      res.json(error);
    }
    // Si hay algún resultado, quiere decir que fue obtenido desde Redis
    // En este caso, lo devolvemos sin más
    if (result) {
      res.json(JSON.parse(result));
    } else {
      // Si no se encontró nada en Redis, se busca en la DB
      let user = await mongo.getAllUsers();
 
      // Y se guarda en Redis para que esté disponible en la próxima llamada
      redisClient.set(userRedisKey, JSON.stringify(user), 'EX', process.env.CACHE_EX);
 
      res.send(user);
    }
  });
})


const port = 3000;
const nodeenv = process.env.NODE_ENV;
const description = process.env.API_DESCRIPTION;

app.listen(port, function() {
  console.log(`Aplicación escuchando el puerto ${port}!`);
  console.log(`Trabajando con entorno ${nodeenv}`);
  console.log(`Descripción: ${description}`);
});
