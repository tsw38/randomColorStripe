import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import path from 'path';
import morgan from 'morgan';
import mysql from 'mysql';
// import gameRoutes from './routes/game';
import dotenv from 'dotenv';
import uuid from 'uuid/v4';
import btoa from 'btoa';
import atob from 'atob';

dotenv.config();

const app    = express();
// const con    = mysql.createConnection({
//   host:process.env.DB_HOST,
//   user:process.env.DB_USER,
//   password:process.env.DB_PASS,
//   database:process.env.DB_NAME
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(__dirname + './../public'));
// app.use('/game/:hash', express.static(__dirname + './../public'));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));






app.listen(process.env.APP_PORT, '0.0.0.0', () => { //broadcast to network
  console.log(`Listening to port ${process.env.APP_PORT}`);
});
