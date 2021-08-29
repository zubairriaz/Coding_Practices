import { gql } from "@apollo/client";
import React, { useState } from "react";

import { useStore } from "../store";
import Errors from "./Errors";
import {useMutation} from "@apollo/client"

/** GIA NOTES
 * Define GraphQL operations here...
 */
export const LOGIN_MUTATION = gql`
mutation userLogin($input:AuthInput!){
  userLogin(input:$input){
    errors{
      message
    }
    User{
      id
      username
      name
    }
    authtoken
  }
}`;
export default function Login() {
	const {  setLocalAppState } = useStore();
	const [uiErrors, setUIErrors] = useState();
	const [loginUser, {error,loading}] = useMutation(LOGIN_MUTATION);
	const handleLogin = async (event) => {
		event.preventDefault();
		const input = event.target.elements;
		const { data } = await loginUser({
      variables : {
        input: {
          username: input.username.value,                   
          password: input.password.value,
        },
      },
		});
	console.log(data)
    const { errors,User, authtoken } = data.userLogin;
    if (errors.length > 0) {                                
      return setUIErrors(errors);
    }
    User.authToken = authtoken;
    window.localStorage.setItem('azdev:user', JSON.stringify(User));
    setLocalAppState({ user:User, component: { name: 'Home' } });
	};
  
	return (
		<div className="sm-container">
			<form method="POST" onSubmit={handleLogin}>
				<div className="form-entry">
					<label>
						USERNAME
						<input type="text" name="username" required />
					</label>
				</div>
				<div className="form-entry">
					<label>
						PASSWORD
						<input type="password" name="password" required />
					</label>
				</div>
				<Errors errors={uiErrors} />
				<div className="spaced">
					<button className="btn btn-primary" type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}
