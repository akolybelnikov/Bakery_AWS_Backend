import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = event.body ? JSON.parse(event.body) : {};

    const params = {
        TableName: "products",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            productId: uuid.v1(),
            category: data.category,
            productName: data.productname,
            content: data.content,
            attachment: data.attachment,
            price: data.price,
            createdAt: new Date().getTime()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        callback(null, success(params.Item));
    } catch (e) {
        callback(null, failure({status: false, error: JSON.stringify(e)}));
    }

}