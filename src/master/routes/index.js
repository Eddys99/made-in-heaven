const MasterController = require('../controllers/master-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/register-user')
            .post(MasterController.registerUser);

        router.route('/post-message')
            .post(MasterController.postJob);

        router.route('/discord-servers/add-channel')
            .post(MasterController.addChannelOrServer);

        router.route('/discord-servers/remove-channel')
            .post(MasterController.removeChannel);

        router.route('/discord-servers/add-server')
            .post(MasterController.registerServer);

        router.route('/discord-servers/remove-server')
            .post(MasterController.removeServer);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
