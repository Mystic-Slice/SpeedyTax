import { Button } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ClientHomePage } from './Pages/ClientHomePage';
import { ConsultantHomePage } from './Pages/ConsultantHomePage';
import { Login } from './Pages/Login';
import { TaxFilingPage } from './Pages/TaxFilingPage';
import { User } from '../types';

export const appTheme = {
    primaryColor:"#3fc1c9",
    secondaryColor:"#f5f5f5",
    primaryAccentColor:"#fc5185",
    secondaryAccentColor:"#364f6b"
}

export function App() {
    const [user, setUser] = React.useState(null as User);

    const signOut = () => {
        setUser(null as User);
    }

    if(!user) {
        return <Login setUser={setUser}/>
    }

    if(user.type == "client") {
        return (
            <HashRouter>
                <Routes>
                    <Route path = '/' element={<ClientHomePage signOut={signOut} user={user} />}></Route>
                    <Route path = '/filing' element={<TaxFilingPage/>}></Route>
                </Routes>
            </HashRouter>
        )
    }

    if(user.type == "consultant") {
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