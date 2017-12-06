import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const params = {
      TableName: "products",
      Key: {
        userId: "eu-central-1:e393fcdf-4bba-4a36-b844-c8bfafc20fc7",
        productId: event.pathParameters.id
      }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
          // Return the retrieved item
          callback(null, success(result.Item));
        } else {
          callback(null, failure({ status: false, error: "Item not found." }));
        }
      } catch (e) {
        callback(null, failure({ status: false, error: e }));
      }
}

export async function news(event, context, callback) {
  const params = {
    TableName: "news",
    Key: {
      userId: "eu-central-1:e393fcdf-4bba-4a36-b844-c8bfafc20fc7",
      newsId: event.pathParameters.id
    }
  };

  try {
      const result = await dynamoDbLib.call("get", params);
      if (result.Item) {
        // Return the retrieved item
        callback(null, success(result.Item));
      } else {
        callback(null, failure({ status: false, error: "Item not found." }));
      }
    } catch (e) {
      callback(null, failure({ status: false, error: e }));
    }
}