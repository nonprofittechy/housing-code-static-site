import './App.css';
import { Routes, Route, Link, Router,} from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Home from "./Home";
import {useState, createContext, useEffect} from 'react';
import * as Papa from "papaparse";
import housingChecklistCSV from "./housing_code_checklist.csv";

export const ChecklistContext = createContext([[], () => {}]);
function App() {
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {
        fetch( housingChecklistCSV )
            .then( response => response.text() )
            .then( responseText => {
                let data = Papa.parse(responseText).data;
                setChecklist(data);
            });
    }, []);

    return (
        <ChecklistContext.Provider value={[checklist, setChecklist]} >
            <div className="App">
                <div id={'header'}>
                    <Link className='my-link' to={"/"}>
                        <h1>Massachusetts Housing Checklist</h1>
                    </Link>
                    <div className={'separator'}></div>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryName" element={<CategoryPage/>}/>
                </Routes>

                <div id={'footer'}>
                    <div className={'separator'}/>
                    <h1>Footer Text</h1>
                </div>
            </div>
        </ChecklistContext.Provider>
    );
}

export default App;
