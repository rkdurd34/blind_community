
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function AdminPublic({ component: Component, render, location, ...rest }) {

  const [cookies] = useCookies('adminToken');
  const authenticated = (cookies.adminToken) ? true : false;
  console.log(location);
  console.log();
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ?
          render ? (
            render(props)
          ) : (
            <Redirect
              to={{ pathname: '/admin', state: { from: props.location } }} />
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

export default AdminPublic;