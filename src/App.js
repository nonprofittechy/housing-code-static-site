import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Home from "./Home";
import {useState, createContext, useEffect} from 'react';
import * as Papa from "papaparse";
import housingChecklistCSV from "./housing_code_checklist.csv";

export const ChecklistContext = createContext([[], () => {}]);
function App() {
    const [checklist, setChecklist] = useState([]);

    useEffect(() => {
        const script = document.createElement("script");
        script.crossOrigin = 'anonymous';
        script.src = "https://kit.fontawesome.com/04487ecd6c.js";
        //For head
        document.head.appendChild(script);

        const link = document.createElement('link');
        link.rel='stylesheet';
        link.id="google-fonts-1-css";
        link.href="https://fonts.googleapis.com/css?family=Roboto%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CRoboto+Slab%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CQuicksand%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CMontserrat%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&amp;display=auto&amp;ver=6.0";
        link.type="text/css";
        link.media="all";
        document.head.appendChild(link);

        fetch( housingChecklistCSV )
            .then( response => response.text() )
            .then( responseText => {
                let data = Papa.parse(responseText).data;
                console.log('data:', data);
                setChecklist(data);
            });
    }, []);

    return (
        <ChecklistContext.Provider value={[checklist, setChecklist]} >
            <div className="App">
                <div id={'header'}>
                    <Link class='my-link' to={"/"}>
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
