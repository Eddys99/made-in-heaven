const MasterController = require('../controllers/master-controller');
const ValidatorMiddleware = require('../middlewares/validator-middleware');
const UserController = require('../controllers/user-controller');
const passport = require('passport');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/register-user')
            .post(
                ValidatorMiddleware.registerUser,
                MasterController.registerUser
            );

        router.route('/post-message')
            .post(
                ValidatorMiddleware.postJob,
                MasterController.postJob
            );

        router.route('/discord-servers/add-channel')
            .post(
                ValidatorMiddleware.addChannel,
                MasterController.addChannel
            );

        router.route('/discord-servers/remove-channel')
            .post(
                ValidatorMiddleware.removeChannel,
                MasterController.removeChannel
            );

        router.route('/discord-servers/add-server')
            .post(
                ValidatorMiddleware.registerServer,
                MasterController.registerServer
            );

        router.route('/discord-servers/remove-server')
            .post(
                ValidatorMiddleware.removeServer,
                MasterController.removeServer
            );

        router.route('/user/register')
            .post(
                ValidatorMiddleware.userAccountRegister,
                UserController.register
            );

        router.route('/user/authenticate')
            .post(
                ValidatorMiddleware.userAuthentication,
                UserController.authenticate
            );

        router.route('/user/logout')
            .post(
                UserController.logout
            );

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
