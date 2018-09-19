const dynamoose = require('dynamoose')

const userSchema = new dynamoose.Schema(
    {
        email: {
            type: String,
            rangeKey: true,
            index: true
        },
        name: {
            type: String,
        },
        age: Number
    },
    {
        throughput: { read: 15, write: 5 }
    }
)
export default dynamoose.model('User', userSchema)
