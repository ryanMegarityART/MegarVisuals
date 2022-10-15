export const formatJSONResponse = (response: any) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(response),
  };
};

export const formatErrorResponse = (response: any, statusCode: Number) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(response),
  };
};
