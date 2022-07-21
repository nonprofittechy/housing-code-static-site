import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import {useLocation} from "react-router";
import CategoryPage from "./CategoryPage";
import Home from "./Home";
import {useState, createContext, useEffect, Fragment} from 'react';
import housingChecklistJSON from "./housing_code_checklist.json"
import translations from "./translations.json";

import UpToCodeLogo from "./components/UpToCodeLogo";

export const ChecklistContext = createContext([[], () => {}]);
export const LanguageCodeContext = createContext("en");

function App() {
    const [checklist, setChecklist] = useState(housingChecklistJSON.data);
    const [languageCode, setLanguageCode] = useState("en");
    let location = useLocation();

    /**
     * update the language code to make sure it matches what is in the url
     */
    useEffect(() => {
        const newLangCode = location.pathname.substring(1, 3);
        console.log("newLangCode; ", newLangCode)
        if(translations[newLangCode]) {
            setLanguageCode(newLangCode);
        }
        else {
            setLanguageCode("en");
        }

    }, [location])

    return (
        <LanguageCodeContext.Provider value={[languageCode, setLanguageCode]} >
        <ChecklistContext.Provider value={[checklist, setChecklist]} >
            <div className="App">
                <div id={'header'}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                       <UpToCodeLogo/>
                        <Link className='link-no-decoration' to={languageCode === "en" ? "/" : "/" + languageCode + "/"}>
                            <h1>UpToCode: {translations[languageCode]["Massachusetts State Sanitary Code"]}</h1>
                        </Link>
                    </div>
                    <br/>
                    <div className={'separator'}/>
                </div>
                <Routes>
                    {Object.keys(translations).map((langCode) => {
                        let pathLangCode = langCode + "/";
                        if (langCode === "en") {
                            pathLangCode = "";
                        }
                        console.log(pathLangCode)
                        return (<Fragment key={"/" + pathLangCode}>
                                <Route path={"/" + pathLangCode} element={<Home />} />
                                <Route path={"/" + pathLangCode + "category/:categoryName"} element={<CategoryPage/>}/>
                            </Fragment>
                        );
                    })}
                </Routes>
                <div id={'footer'}>
                    <br/>
                    <div className={'separator'}/>
                    <UpToCodeLogo/>
                </div>
            </div>
        </ChecklistContext.Provider>
        </LanguageCodeContext.Provider>
    );
}

export default App;
