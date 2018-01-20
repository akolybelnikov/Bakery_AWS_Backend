import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const data = event.body ? JSON.parse(event.body) : {};

    const params = {
        TableName: "products",
        Item: {
            category: data.category,
            productId: uuid.v1(),
            productName: data.productname,
            content: data.content,
            sort: data.productsort,
            attachment: data.attachment,
            price: data.price,
            image: data.image,
            weight: data.weight,
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

export async function offer(event, context, callback) {
    const data = event.body ? JSON.parse(event.body) : {};

    const params = {
        TableName: "offers",
        Item: {
            active: "true",
            offerId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            image: data.image,
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

export async function news(event, context, callback) {
    const data = event.body ? JSON.parse(event.body) : {};

    const params = {
        TableName: "news",
        Item: {
            archived: "false",
            newsId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            image: data.image,
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