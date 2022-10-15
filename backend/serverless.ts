import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";

const REGION = "eu-west-2";

const serverlessConfiguration: AWS = {
  service: "visuals-backend",
  // variablesResolutionMode: "20210326",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    "serverless-offline": {
      httpPort: 3000,
      websocketPort: 3001,
      lambdaPort: 3002,
    },
    dynamodb: {
      start: {
        port: "8002",
        inMemory: true,
        migrate: true,
      },
      stages: "${opt:stage, self:provider.stage}",
    },
    // variables: "${ssm:/aws/reference/secretsmanager/${opt:stage, self:provider.stage}-}",
    DYNAMODB_ENPOINT: {
      local: "http://localhost:8002",
      dev: `https://dynamodb.${REGION}.amazonaws.com`,
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: REGION,
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:DescribeTable",
          "dynamodb:SSL_OP_NO_QUERY_MTU",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource: `arn:aws:dynamodb:${REGION}:*:*`,
      },
      {
        Effect: "Allow",
        Action: [
          "ec2:DescribeNetworkInterfaces",
          "ec2:CreateNetworkInterface",
          "ec2:DeleteNetworkInterface",
          "ec2:DescribeInstances",
          "ec2:AttachNetworkInterface",
        ],
        Resource: "*",
      },
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      DYNAMODB_TABLE: "${self:service}-${opt:stage, self:provider.stage}",
      STAGE: "${opt:stage, self:provider.stage}",
      DYNAMODB_ENPOINT:
        "${self:custom.DYNAMODB_ENPOINT.${opt:stage, self:provider.stage}}",
      SERVICE_A_ENDPOINT:
        "${self:custom.SERVICE_A_ENDPOINT.${opt:stage, self:provider.stage}}",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello },
  resources: {
    Resources: {
      Visuals: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: "${self:provider.environment.DYNAMODB_TABLE}",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
