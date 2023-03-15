import React from 'react';

class LoginForm extends React.Component {
    render() {
      return (
        <div>
        <form>
          <label>
            Nom d'utilisateur:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Mot de passe:
            <input type="password" name="password" />
          </label>
          <br />
          <input type="submit" value="Se connecter" />
        </form>
      </div>
      );
    }
  }
  
  export default LoginForm;