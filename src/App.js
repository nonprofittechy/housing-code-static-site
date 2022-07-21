import './App.css';
import { Routes, Route, Link, useLocation} from "react-router-dom";
import CategoryPage from "./CategoryPage";
import Home from "./Home";
import {useState, createContext, useEffect, Fragment} from 'react';
import housingChecklistJSON from "./housing_code_checklist.json"
import translations from "./translations.json";

import UpToCodeLogo from "./components/UpToCodeLogo";

export const ChecklistContext = createContext([[], () => {}]);
export const LanguageCodeContext = createContext("en");
export const WindowWidthContext = createContext(window.innerWidth);


function App() {
    const [checklist, setChecklist] = useState(housingChecklistJSON.data);
    const [languageCode, setLanguageCode] = useState("en");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    }, [location]);

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
    });

    const headerContents = [<UpToCodeLogo/>,
        <Link className='link-no-decoration' to={languageCode === "en" ? "/" : "/" + languageCode + "/"}>
            <h1>{translations[languageCode]["Massachusetts State Sanitary Code"]}</h1>
        </Link>];

    return (
        <WindowWidthContext.Provider value={[windowWidth, setWindowWidth]}>
        <LanguageCodeContext.Provider value={[languageCode, setLanguageCode]} >
        <ChecklistContext.Provider value={[checklist, setChecklist]} >
            <div className="App">
                <div id={'header'}>
                    <div style={{display: "flex", flexDirection:(windowWidth < 800)? "column" : "row"}}>
                        <UpToCodeLogo/>
                        <div style={{display: "flex", flexDirection:(windowWidth < 300)? "column" : "row"}}>
                            <h3 className={'header-link'}>Home</h3>
                            <h3 className={'header-link'}>FAQ</h3>
                            <Link className='link-no-decoration' to={languageCode === "en" ? "/" : "/" + languageCode + "/"} >
                                <h3 className={'header-link header-link-current'} >Read the code</h3>
                            </Link>
                            <h3 className={'header-link'}>Find my inspector</h3>
                        </div>
                    </div>
                    {/*<br/>*/}
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
        </WindowWidthContext.Provider>
    );
}

export default App;
