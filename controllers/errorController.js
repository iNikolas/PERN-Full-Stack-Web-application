exports.internalServerError = (error, req, res, next) => {
    console.error(`ERROR occurred ${new Date()}: ${error.stack}`);
    const code = 500
    const title = error.name
    const detail = error.message

    handleErrorSubmit({code, title, detail}, req, res)
}

exports.pageNotFoundError = (req, res) => {
    const code = 404
    const title = 'HTTP 404'
    const detail = 'Not found.'

    handleErrorSubmit({code, title, detail}, req, res)
};

function handleErrorSubmit(error, req, res) {
    const pointer = req.originalUrl
    res.status(error.code)
    res.set('Content-Type', 'application/vnd.api+json')

    const resData = {
        jsonapi: {version: "1.0"},
        errors: [Object.assign(error, {source: {pointer}})]
    }
    res.json(resData)
}