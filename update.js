import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "products",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'productId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      productId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET category = :category, content = :content, attachment = :attachment, productName = :productname, price = :price, weight = :weight, image = :image",
    ExpressionAttributeValues: {
      ":category": data.category ? data.category : null,
      ":productname": data.productname ? data.productname : null,
      ":content": data.content ? data.content : null,
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