import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Authenticator } from 'aws-amplify-react';
import { StaticContext } from 'react-router';

import queryString from 'query-string';

const AuthComponent: React.FC<RouteComponentProps<any, StaticContext, any>> = (props: any) => {
  const signUpConfig = {signUpFields: [
    {label: 'Birthdate',
     key: 'birthdate',
     required: true,
     type: 'date',
    },
    {label: 'Address',
     key: 'address',
     required: true,
     type: 'string',
    }
  ]};
  const handleStateChange = (state: any) => {
    if (state === 'signedIn') {
      props.onUserSignIn();
      
      const queryParams = queryString.parse(props.location.search);
      props.history.push(queryParams.redirect)
    } else {
      props.onUserNotSignedIn();
    }
  };
  return (
    <div>
      <Authenticator onStateChange={handleStateChange} signUpConfig={signUpConfig}/>
    </div>
    )
}

export default AuthComponent;
