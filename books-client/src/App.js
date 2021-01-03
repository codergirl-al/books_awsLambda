import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Books from "./pages/Books";
import Amplify from "aws-amplify";
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "Email",
            placeholder: "Email",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Password",
            required: true,
          },
        ]}
      />
      <AmplifySignIn
        slot="sign-in"
        usernameAlias="email"
        className="signInForm"
      />
      <AmplifySignOut />
      <Books />
    </AmplifyAuthenticator>
  );
}

export default App;
