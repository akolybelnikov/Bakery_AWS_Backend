import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import config from "./config/config"

export async function main(event, context, callback) {
  const params = {
    TableName: "categories",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": config.cognito.USER_ID
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false, error: e }));
  }
}

export async function products(event, context, callback) {
  const params = {
    TableName: "products",
    KeyConditionExpression: "category = :category",
    ExpressionAttributeValues: {
      ":category": event.pathParameters.category
    },
    "ScanIndexForward": false
  };

  try {
    const result = await dynamoDbLib.call("query", params);

    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false, error: e }));
  }
}

export async function offer(event, context, callback) {
  const params = {
    TableName: "offers",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": config.cognito.USER_ID
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);

    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false, error: e }));
  }
}

export async function news(event, context, callback) {
  const params = {
    TableName: "news",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": config.cognito.USER_ID
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);

    // Return the list of products in response body
    callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false, error: e }));
  }
}