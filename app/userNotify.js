const aws = require("aws-sdk");
const ses = new aws.SES();
const ADM_EMAIL = "albina.peposhi@gmail.com"; // verified receiver’s email
const NO_REPLY_EMAIL = "codegirl.al@gmail.com";

function sendNotification(userEmail) {
  const notificationText = `
    New user with email: ${userEmail} successfully registered!
    `;
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: [ADM_EMAIL],
      },
      Message: {
        Body: {
          Text: {
            Data: notificationText,
          },
        },
        Subject: {
          Data: "New User confirmed!",
        },
      },
      Source: NO_REPLY_EMAIL,
    };
    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports.newUserNotify = async (event) => {
  const attributes = event.request.userAttributes; // read user attributes from an event
  await sendNotification(attributes.email);
  return event; // pass event object back, as Cognito expects it to be returned
};
