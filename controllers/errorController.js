exports.internalServerError = (error, req, res, next) => {
    console.error(`ERROR occurred: ${error.stack}`);
    const status = 500
    const title = error.name
    const message = error.message

    handleErrorSubmit({status, title, message}, res)
}

exports.pageNotFoundError = (req, res) => {
    const status = 404
    const title = 'HTTP 404'
    const message = 'Not found.'

    handleErrorSubmit({status, title, message}, res)
};

function handleErrorSubmit(error, res) {
    res.status(error.status)
    res.set('Content-Type', 'application/vnd.api+json')

    const resData = {
        errors: [error]
    }
    res.json(resData)
}