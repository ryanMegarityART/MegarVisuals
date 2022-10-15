import { receivedMessageGenerator } from "./../handler";

const testInput = {
  resourceType: "Bundle",
  type: "transaction",
  entry: [
    {
      request: {
        method: "POST",
        url: "Encounter",
      },
      resource: {
        resourceType: "Encounter",
        text: {
          status: "empty",
          div: "<b>narrative not required</b>",
        },
        status: "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: "HH",
          display: "home health",
        },
        subject: {
          reference: "Patient/NHS_NUMBER",
        },
        period: {
          end: "2021-08-27",
        },
      },
    },
    {
      request: {
        method: "POST",
        url: "Observation",
      },
      resource: {
        resourceType: "Observation",
        code: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "Main Snomed Code",
              display: "O/E - blood pressure reading",
            },
          ],
        },
        effectiveDateTime: "2022-08-05T11:53:33.309Z",
        subject: {
          reference: "Patient/NHS_NUMBER",
        },
        component: [
          {
            code: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "1234567890",
                  display: "Systolic blood pressure",
                },
              ],
            },
            valueQuantity: {
              value: 100,
              unit: "mmHg",
            },
          },
          {
            code: {
              coding: [
                {
                  system: "http://snomed.info/sct",
                  code: "1234567890",
                  display: "Diastolic blood pressure",
                },
              ],
            },
            valueQuantity: {
              value: 100,
              unit: "mmHg",
            },
            note: [
              {
                text: "A note from f3 clinician",
              },
            ],
          },
        ],
      },
    },
  ],
};

test("hello function returns expected string", () => {
  expect(receivedMessageGenerator(testInput)).toBe(
    'Thank you for submitting the reading [{"request":{"method":"POST","url":"Observation"},"resource":{"resourceType":"Observation","code":{"coding":[{"system":"http://snomed.info/sct","code":"Main Snomed Code","display":"O/E - blood pressure reading"}]},"effectiveDateTime":"2022-08-05T11:53:33.309Z","subject":{"reference":"Patient/NHS_NUMBER"},"component":[{"code":{"coding":[{"system":"http://snomed.info/sct","code":"1234567890","display":"Systolic blood pressure"}]},"valueQuantity":{"value":100,"unit":"mmHg"}},{"code":{"coding":[{"system":"http://snomed.info/sct","code":"1234567890","display":"Diastolic blood pressure"}]},"valueQuantity":{"value":100,"unit":"mmHg"},"note":[{"text":"A note from f3 clinician"}]}]}}]'
  );
});
