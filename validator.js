exports.validateBody = (schema) => {
    return (req, res, next) => {
        const { body } = req;
        const { error } = schema.validate(body, {});
        if (error) {
            next(error);
        }
        next();
    };
};
