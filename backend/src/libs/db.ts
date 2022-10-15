import AWS from "aws-sdk";

let docClient = new AWS.DynamoDB.DocumentClient({
  region: "eu-west-2",
  endpoint: process.env.DYNAMODB_ENPOINT,
  convertEmptyValues: true,
});

const PUT = async (params: AWS.DynamoDB.DocumentClient.PutItemInput) => {
  console.log("Putting new item...");
  try {
    const dbResp = await docClient.put(params).promise();
    return dbResp;
  } catch (e) {
    console.log(e);
    return {
      error: "There was an error putting item",
    };
  }
};

const SCAN = async (params: AWS.DynamoDB.DocumentClient.ScanInput) => {
  try {
    const dbResp = await docClient.scan(params).promise();
    return dbResp;
  } catch (e) {
    console.log(e);
    return { error: "there was an error scanning the table" };
  }
};

export const db = {
  PUT,
  SCAN,
};
