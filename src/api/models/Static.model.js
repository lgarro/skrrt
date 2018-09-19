const dynamoose = require('dynamoose')

// const Schema = {dynamoose}

const staticSchema = new dynamoose.Schema({
    type: {
        type: String
    },
    description: {
        type: String
    }
})
// export default staticSchema
export default dynamoose.model('Static', staticSchema)
