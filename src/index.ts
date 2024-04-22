import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// socket io
import http from 'http';
import socketio from 'socket.io';
import sequelize from '@utils/sequelize';

// import routes
import studentRoute from '@routes/student';

// initialize app
const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


// Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Api is working :)</h1>');
});


//Routes Defined Here
app.use('/v1/student', studentRoute);


// Handling 404 Page Not Found
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found on the server</h1>');
});

// Create server
const httpServer = http.createServer(app);
// socket io testing
export const server = new socketio.Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// we will create separate file for this 
//check client connection
server.on('connection', (socket: any) => {
  //Socket is a Link to the Client
  console.log('New Client is Connected!');
  app.set('socketService', socket);
});


// Start the server after the database connection is established
sequelize
  .sync() // Synchronize the database with the defined models
  .then(() => {
    console.log('Database is in sync');
    httpServer.listen(9000, () => {
      console.log('api is running');
    });
  })
  .catch((error: any) => {
    console.error('Error syncing the database:', error);
  });


