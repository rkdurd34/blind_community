import { useCookies } from 'react-cookie';
import { Route, Redirect } from 'react-router-dom';

function AdminPrivate({ component: Component, render, history, ...rest }) {

  const [cookies] = useCookies('adminToken');
  const authenticated = (cookies.adminToken) ? true : false;
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
            to={{ pathname: "/admin/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default AdminPrivate;