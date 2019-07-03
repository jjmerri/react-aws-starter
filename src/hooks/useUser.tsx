import { useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

function useUser() {
  const [user, setUser] = useState();

  useEffect(() => {
    const handleAuthEvent = () => {
      Auth.currentAuthenticatedUser()
    .then(user => setUser(user))      
    .catch(() => setUser(null));  
    }
    Hub.listen('auth', data => {
      handleAuthEvent();
    })

    //check on load in case user already logged in
    handleAuthEvent();

    return () => {
      Hub.remove('auth',()=>{});
    };
  }, []);
  return [user];
}

export default useUser;