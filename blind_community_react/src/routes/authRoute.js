import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AuthRoute({ component: Component, render, history, ...rest }) {

  const [cookies] = useCookies('accessToken');
  console.log(cookies.asd);
  console.log(cookies.accessToken === undefined);
  const authenticated = (cookies.accessToken === undefined) ? false : true;
  console.log(rest);
  console.log(authenticated);
  console.log(cookies.accessToken);
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AuthRoute;