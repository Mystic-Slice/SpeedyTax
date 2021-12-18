import { Button } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ClientHomePage } from './Pages/ClientHomePage';
import { ConsultantHomePage } from './Pages/ConsultantHomePage';
import { Login } from './Pages/Login';
import { TaxFilingPage } from './Pages/TaxFilingPage';

export interface User {
    userName: string,
    password: string,
    type: "client" | "consultant"
}

export function App() {
    const [user, setUser] = React.useState(null as User);

    // const navigate = useNavigate();

    const signOut = () => {
        setUser(null as User);
    }

    if(!user) {
        return <Login setUser={setUser}/>
    }

    if(user.type == "client") {
        // navigate('/clientHome');
        return (
            <HashRouter>
                <Routes>
                    <Route path = '/' element={<ClientHomePage signOut={signOut}/>}></Route>
                    <Route path = '/filing' element={<TaxFilingPage/>}></Route>
                </Routes>
            </HashRouter>
        )
    }

    if(user.type == "consultant") {
        // navigate('/consultantHome')
        return (
            <HashRouter>
                <Routes>
                    <Route path = '/' element={<ConsultantHomePage signOut={signOut}/>}></Route>
                </Routes>
            </HashRouter>
        )
    }


}

ReactDOM.render(<App/>, document.getElementById('root'));