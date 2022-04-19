"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: 'eu-central-1' });
const router = express_1.default.Router();
const dynamodb = new aws_sdk_1.default.DynamoDB.DocumentClient();
const dynamodbTableName = 'validation-employees';
router.get('/', async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            id: req.query.id
        }
    };
    await dynamodb
        .get(params)
        .promise()
        .then(response => {
        res.json(response.Item);
    }, error => {
        console.error('Error handling log: ', error);
        res.status(500).send(error);
    });
});
router.get('/all', async (req, res) => {
    const params = {
        TableName: dynamodbTableName
    };
    try {
        const allEmployees = await scanDynamoRecords(params, []);
        const body = {
            employees: allEmployees
        };
        res.json(body);
    }
    catch (error) {
        console.error('Error handling log: ', error);
        res.status(500).send(error);
    }
});
router.post('/', async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Item: req.body
    };
    await dynamodb
        .put(params)
        .promise()
        .then(() => {
        const body = {
            Operation: 'SAVE',
            Message: 'SUCCESS',
            Item: req.body
        };
        res.json(body);
    }, error => {
        console.error('Error handling log: ', error);
        res.status(500).send(error);
    });
});
router.patch('/', async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            id: req.body.id
        },
        UpdateExpression: `set ${req.body.updateKey} = :value`,
        ExpressionAttributeValues: {
            ':value': req.body.updateValue
        },
        ReturnValues: 'UPDATED_NEW'
    };
    await dynamodb
        .update(params)
        .promise()
        .then(response => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            UpdatedAttributes: response
        };
        res.json(body);
    }, error => {
        console.error('Error handling log: ', error);
        res.status(500).send(error);
    });
});
router.delete('/', async (req, res) => {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            id: req.body.id
        },
        ReturnValues: 'ALL_OLD'
    };
    await dynamodb
        .delete(params)
        .promise()
        .then(response => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        };
        res.json(body);
    }, error => {
        console.error('Error handling log: ', error);
        res.status(500).send(error);
    });
});
async function scanDynamoRecords(scanParams, itemArray) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        itemArray = itemArray.concat(dynamoData.Items);
        if (dynamoData.LastEvaluatedKey) {
            scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
            return await scanDynamoRecords(scanParams, itemArray);
        }
        return itemArray;
    }
    catch (error) {
        console.error('Error handling log: ', error);
    }
}
exports.default = router;
