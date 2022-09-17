const MasterController = require('../controllers/master-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/register-user')
            .post(MasterController.registerUser);

        router.route('/post-message')
            .post(MasterController.postJob);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
