import { Button } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import { Login } from './Pages/Login';
import { TaxFilingPage } from './Pages/TaxFilingPage';

export interface User {
    userName: string,
    password: string,
    type: "client" | "consultant"
}

export function App() {
    const [user, setUser] = React.useState(null as User);

    const signOut = () => {
        setUser(null as User);
    }

    if(!user) {
        return <Login setUser={setUser}/>
    }

    return (
        <HashRouter>
            <Routes>
                <Route path = '/' element={<HomePage signOut={signOut}/>}></Route>
                <Route path = '/filing' element={<TaxFilingPage/>}></Route>
            </Routes>
        </HashRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));