import { App } from './src/Server';
import { Application } from 'express';
import { UserRoutes } from './src/routes/UserRoutes';
import DB from './src/config/DB';

// 8888888888 888b    888 88888888888 8888888b. Y88b   d88P      88888888888 .d88888b.              d8888 8888888b.  8888888b.
// 888        8888b   888     888     888   Y88b Y88b d88P           888    d88P" "Y88b            d88888 888   Y88b 888   Y88b
// 888        88888b  888     888     888    888  Y88o88P            888    888     888           d88P888 888    888 888    888
// 8888888    888Y88b 888     888     888   d88P   Y888P             888    888     888          d88P 888 888   d88P 888   d88P
// 888        888 Y88b888     888     8888888P"     888              888    888     888         d88P  888 8888888P"  8888888P"
// 888        888  Y88888     888     888 T88b      888              888    888     888        d88P   888 888        888
// 888        888   Y8888     888     888  T88b     888              888    Y88b. .d88P       d8888888888 888        888
// 8888888888 888    Y888     888     888   T88b    888              888     "Y88888P"       d88P     888 888        888

//Construct App & Create Server & listen
const app: Application = new App().getApp();

//Database Connection -> provide .env MONGO_URI
const db = new DB(process.env.MONGO_URI);
db.connectDB();

//Set User Routes
const userRoutes = new UserRoutes(app);
userRoutes.setConfig();
