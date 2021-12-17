import { Button } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import TaxFilingPage from './Pages/TaxFilingPage';

export function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path = '/' element={<HomePage/>}></Route>
                <Route path = '/filing' element={<TaxFilingPage/>}></Route>
            </Routes>
        </HashRouter>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));