import RoutesFeaturesUsers from './routes/FeaturesUsers/FeaturesUsers.routes';
import Login from './routes/Login.routers';
import CreateUser from './routes/CreateUsers.routes';

import UploadArquivos from './routes/UploadArquivos/UploadArquivos.routes';

import Session from './routes/Session.router';

const RoutesApp = [Login, CreateUser, Session];

const RoutesUpdate = UploadArquivos;

export { RoutesApp, RoutesFeaturesUsers, RoutesUpdate };
