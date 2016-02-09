var baseUrl = 'succss.ifzenelse.net';

module.exports = {

    pages: {
        'bodyDefault': { url:baseUrl },
        'bodyCapture': {
            url:baseUrl,
            captures: {
                'fullPage': 'body'
            }
        },
    }
}