module.exports = (schema) => {
    return (req, res, next) => {
        const data = {};
        if (schema.body) {
            const { error } = schema.body.validate(req.body);
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: error.details[0].message.replace(/"/g, "")
                });
            }
        }

        if (schema.params) {
            const { error } = schema.params.validate(req.params);
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: error.details[0].message.replace(/"/g, "")
                });
            }
        }

        if (schema.query) {
            const { error } = schema.query.validate(req.query);
            if (error) {
                return res.status(400).json({
                    status: 400,
                    error: error.details[0].message.replace(/"/g, "")
                });
            }
        }

        next();
    }
}
