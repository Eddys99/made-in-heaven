const ErrorDTO = require('src/commons/dtos/error-dto.js');
const Logger = require('src/commons/logger/logger-config.js');

const PostJobRepository = require('../repositories/post-job-repository');

const $LABEL = 'PostJobServices';

class PostJobServices {

    static saveJob(payload) {
        return PostJobRepository.saveJob({
            request_id: payload.request_id,
            user_id: payload.user_id,
            content_text: payload.content_text,
            embeds: payload.embeds,
        });
    }
}

module.exports = PostJobServices;
