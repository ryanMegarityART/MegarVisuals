'use strict'

export const resp = (data) => {
    const { code = 200 } = data;

    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(data)
    }
};
