import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const params = {
    TableName: "categories",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "eu-central-1:e393fcdf-4bba-4a36-b844-c8bfafc20fc7"
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
}

export async function products(event, context, callback) {
  const params = {
    TableName: "products",
    IndexName: "category-index",
    KeyConditionExpression: "category = :category",
    ExpressionAttributeValues: {
      ":category": event.pathParameters.id
    },
    "ScanIndexForward": false
  };

  try {
    const result = await dynamoDbLib.call("query", params);

    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false, error: e }));
  }
}