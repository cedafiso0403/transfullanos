const Ajv = require("ajv")
const addFormats = require("ajv-formats")
const ajv = new Ajv({ allErrors: true, useDefaults: 'empty', coerceTypes: true })
require("ajv-errors")(ajv)
require("ajv-keywords")(ajv, "transform")
addFormats(ajv)


const schema = {
    type: "object",
    required: ["weight", "width", "height", "length", "fromCountry", "fromCity", "toCountry", "toCity", "date", "description"],
    properties: {
        weight: {
            type: "number",
            minimum: 1,
        },
        width: {
            type: "number",
            minimum: 1,
        },
        height: {
            type: "number",
            minimum: 1,
        },
        length: {
            type: "number",
            minimum: 1,
        },
        fromCountry: {
            type: "string",
            transform: ["trim", "toLowerCase"],
            minLength: 1,
            maxLength: 40
        },
        fromCity: {
            type: "string",
            transform: ["trim", "toLowerCase"],
            minLength: 1,
            maxLength: 40
        },
        toCountry: {
            type: "string",
            transform: ["trim", "toLowerCase"],
            minLength: 1,
            maxLength: 40
        },
        toCity: {
            type: "string",
            transform: ["trim", "toLowerCase"],
            minLength: 1,
            maxLength: 40
        },
        description:{
            type: "string",
            transform: ["trim", "toLowerCase"],
            minLength: 1,
            maxLength: 300
        }
    },
    additionalProperties: true,
    errorMessage: {
        type: "Should be an object",
        properties: {
            weight: "Weight should be a number greater than 0",
            width: "Width should be a number greater than 0",
            height: "Height should be a number greater than 0",
            length: "Length should be a number greater than 0",
            fromCountry: "From country should be a word of only character",
            fromCity: "From city should be a word of only character",
            toCountry: "To country should be a word of only character",
            toCity: "To city should be a word of only character",
            date: "Date should be a valid date format",
            description: "Description should contain at least one character",
        }
    }
}


const validate = ajv.compile(schema)
const orderFormValidator = (req, res, next) => {
    let errors = [];
    if (!validate(req.body)) {
        validate.errors.forEach(error => {
            errors.push({ 'message': error.message });
        });
    }
    res.locals.formErrors = errors;
    next();
}


exports.orderFormValidator = orderFormValidator;
