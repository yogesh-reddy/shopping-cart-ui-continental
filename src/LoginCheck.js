import React from 'react';
import GoogleLogin from 'react-google-login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import AuthApi from './AuthApi';
import App from "./App";
import "./loginc.css"
function Logincheck() {
    const [auth, setAuth] = React.useState(false);
    const readCookie = () => {
        const user = Cookies.get('SESSION_TOKEN');
        if (user) {
            setAuth(true);
        }
    };
    React.useEffect(() => {
        readCookie();
    });

    return (
        <div>
            <AuthApi.Provider value={{auth, setAuth}}>
                <Router>
                    <Routes/>
                </Router>
            </AuthApi.Provider>
        </div>
    );
}


const LoginCheck = () => {
    const Auth = React.useContext(AuthApi);
   // const [userName, setUserName,] = React.useState('');
   // const [acesstocken, setaccestocken] = React.useState('');
    const [mail, setMail] = React.useState('');
   // const [imageUri, setImageURI] = React.useState('');
    const onSuccessGoogle = (response) => {
        console.log(response.profileObj)
      //  setUserName(response.profileObj.given_name);
        //setaccestocken(response.Rt.accessToken)
        setMail(response.profileObj.email);
        //setImageURI(response.profileObj.imageUrl)
        Cookies.set('SESSION_TOKEN', response.profileObj.email)
        Auth.setAuth(true);
    }
    const onFailure = (response) => {
        console.log("fails")
        console.log(response)
    }
    // const buttonLogin = (event) => {
    //         Cookies.set('SESSION_TOKEN', "y@g.com")
    //         Auth.setAuth(true);
    //     }
    return (
        <div className="container">
            <form>
                <div className="row">

                    <h2 className="h2-text">Continental Automotives</h2>
                    <h3 className="h3-text">Login</h3>
                    <div class="col">
                        <input type="text" name="username" placeholder="Username" required/>
                            <input type="password" name="password" placeholder="Password" required/>
                                <input type="submit"   value="Login"/>
                        {/*onSubmit={buttonLogin()}*/}
                    </div>

                    <div className="col">
                        <a  className="google btn"><i className="fa fa-google fa-fw">
                        </i> Login with Google+
                            <GoogleLogin
                                clientId="964007476173-6cgjdq5rkm3ptnsqlpocqjjos3gpu7lh.apps.googleusercontent.com"
                                buttonText="sign in with Google"
                                onSuccess={onSuccessGoogle}
                                onFailure={onFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                        </a>
                    </div>


                </div>
            </form>
        </div>
    )
}

const ProtectedLogin = ({auth, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={() => (!auth ? (
            <Component/>
        ) : (
            <Redirect to="/"/>
        ))}
    />
);

const ProtectedRoute = ({auth, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() => (auth ? (
                <Component/>
            ) : (
                <Redirect to="/login"/>
            ))}
        />
    );
};

const Routes = () => {
    const Auth = React.useContext(AuthApi);

    return (
        <Switch>
            <ProtectedLogin path="/login" component={LoginCheck} auth={Auth.auth}/>
            <ProtectedRoute path="/" auth={Auth.auth} component={App}/>
        </Switch>
    );
};


export default Logincheck;
