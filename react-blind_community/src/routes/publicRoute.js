
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function PublicRoute({ component: Component, render, location, ...rest }) {

  const [cookies] = useCookies('accessToken');
  const authenticated = (cookies.accessToken) ? true : false;

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ?
          render ? (
            render(props)
          ) : (
            <Redirect
              to={{ pathname: '/', state: { from: props.location } }} />
          ) : <Component {...props} />
        // authenticated ? (
        //   render ? (
        //     render(props)
        //   ) : (
        // <Component {...props} />
        // )
        // ) : (
        //   <Redirect
        //     to={{ pathname: "/signin", state: { from: props.location } }}
        //   />
        // )
      }
    />
  );
}

export default PublicRoute;