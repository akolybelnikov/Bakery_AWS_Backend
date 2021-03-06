import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "products",
    Key: {
      category: event.pathParameters.category,
      productId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, sort = :sort, attachment = :attachment, productName = :productname, price = :price, weight = :weight, image = :image",
    ExpressionAttributeValues: {
      ":productname": data.productname ? data.productname : null,
      ":content": data.content ? data.content : null,
      ":sort": data.productsort ? data.productsort : null,
      ":attachment": data.attachment ? data.attachment : null,
      ":price": data.price ? data.price : null,
      ":weight": data.weight ? data.weight : null,
      ":image": data.image ? data.image : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}

export async function news(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "news",
    Key: {
      archived: "false",
      newsId: event.pathParameters.id
    },
    UpdateExpression: "SET content = :content, attachment = :attachment, image = :image",
    ExpressionAttributeValues: {
      ":content": data.content ? data.content : null,
      ":attachment": data.attachment ? data.attachment : null,
      ":image": data.image ? data.image : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}