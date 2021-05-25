import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AdminPrivate({ component: Component, render, history, ...rest }) {

  const [cookies] = useCookies('adminToken');
  const authenticated = (cookies.adminToken) ? true : false;
  console.log(authenticated);
  console.log(cookies);
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