import './App.css';
import { Routes, Route, Link, Router,} from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Home from "./Home";
import {useState, createContext, useEffect} from 'react';
import * as Papa from "papaparse";
import housingChecklistCSV from "./housing_code_checklist.csv";
import UpToCodeLogo from "./components/UpToCodeLogo";

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
                    <div style={{display: "flex", flexDirection: "row"}}>
                       <UpToCodeLogo/>
                        <Link className='link-no-decoration' to={"/"}>
                            <h1>UpToCode: Massachusetts State Sanitary Code</h1>
                        </Link>
                    </div>


                    <br/>
                    <div className={'separator'}/>
                </div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:categoryName" element={<CategoryPage/>}/>
                </Routes>

                <div id={'footer'}>
                    <br/>
                    <div className={'separator'}/>
                    <UpToCodeLogo/>
                </div>
            </div>
        </ChecklistContext.Provider>
    );
}

export default App;
