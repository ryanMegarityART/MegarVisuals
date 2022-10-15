import "source-map-support/register";

import { formatErrorResponse, formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { schema } from "./schema";

export const receivedMessageGenerator: any = (body: any) => {
  console.log("body: ", body, "entry: ", body.entry);
  const parseReading = body.entry.filter((e) => {
    if (e.resource.resourceType == "Observation") {
      return e;
    }
  });
  return `Thank you for submitting the reading ${JSON.stringify(parseReading)}`;
};

const hello = async (event: any) => {
  const body = event.body;
  console.log("Request body: ", body);
  const validation = schema.validate(body);
  console.log("validation: ", validation);
  if (validation.error) {
    return formatErrorResponse(validation, 400);
  }
  return formatJSONResponse(receivedMessageGenerator(body));
};

export const main = middyfy(hello);
