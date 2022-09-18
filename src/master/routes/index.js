const MasterController = require('../controllers/master-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/register-user')
            .post(MasterController.registerUser);

        router.route('/post-message')
            .post(MasterController.postJob);

        router.route('/discord-server/addChannelOrServer')
            .post(MasterController.addChannelOrServer)

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
