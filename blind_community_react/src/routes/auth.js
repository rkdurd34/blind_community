import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AuthRoute({ component: Component, render, ...rest }) {

  const [cookies] = useCookies('accessToken');
  const authenticated = (cookies.accessToken) ? true : false;

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