const dynamoose = require('dynamoose')
const Schema = { dynamoose }

const dogSchema = new Schema(
    {
        ownerId: {
            type: Number,
            validate(v) { return v > 0 },
            hashKey: true
        },
        name: {
            type: String,
            rangeKey: true,
            index: true // name: nameLocalIndex, ProjectionType: ALL
        },
        race: {
            type: String,
            enum: ['Golden retriever', 'Beagle']
        },
        breed: {
            type: String,
            trim: true,
            required: true,
            index: {
                global: true,
                rangeKey: 'ownerId',
                name: 'BreedIndex',
                project: true, // ProjectionType: ALL
                throughput: 5 // read and write are both 5
            }
        },
        color: {
            lowercase: true,
            type: [String],
            default: ['Brown']
        },
        age: Number
    },
    {
        throughput: { read: 15, write: 5 }
    }
)
