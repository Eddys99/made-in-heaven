const MasterController = require('../controllers/master-controller');

class Router {
    constructor(express) {
        const router = express.Router();
        const app = express();

        router.route('/get')
            .get(MasterController.testGet);

        router.route('/post')
            .post(MasterController.testPost);

        app.use('/', router);

        return app;
    }
}

module.exports = Router;
