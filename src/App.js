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

    // Is this still used?
    const headerContents = [
        <UpToCodeLogo/>,
        <Link className='link-no-decoration' to={languageCode === "en" ? "/" : "/" + languageCode + "/"}>
            <h1>{translations[languageCode]["Massachusetts State Sanitary Code"]}</h1>
        </Link>
    ];

    return (
        <WindowWidthContext.Provider value={[windowWidth, setWindowWidth]}>
        <LanguageCodeContext.Provider value={[languageCode, setLanguageCode]} >
        <ChecklistContext.Provider value={[checklist, setChecklist]} >
            <div class="topnav">
                <div id='language-container'>
                    <Link className='link-no-decoration' to={languageCode === "en" ? "/es/" : "/"} >
                        <span class="language-link">{languageCode === "en" ? "español" : "English"}</span>
                    </Link>                    
                </div>
            </div>
            <div className="App">
                <section id='header_section'>
                    <div id='header' style={{display: "flex", flexDirection:(windowWidth < 800)? "column" : "row"}}>
                        <div className='header-part logo'>
                            <UpToCodeLogo/>
                        </div>
                        <div className='header-part header-links'>
                            <nav className='nav' style={{display: "flex", flexDirection:(windowWidth < 300)? "column" : "row", flex: 1, justifyContent: "space-between"}}>
                                <div style={{display: "flex", flexDirection:(windowWidth < 300)? "column" : "row"}}>
                                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/about/">
                                        <h3 className={'header-link-text'}>About</h3>
                                    </a>
                                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/faqs/">
                                        <h3 className={'header-link-text'}>FAQs</h3>
                                    </a>
                                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/find-your-inspector/">
                                        <h3 className={'header-link-text'}>Find Your Inspector</h3>
                                    </a>
                                    <a class='header-link link-no-decoration' href={languageCode === "en" ? "/" : "/" + languageCode + "/"} >
                                        <h3 className={'header-link-text header-link-text-current'} >Read the Code</h3>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </section>
                <section><div className={'separator'}/></section>
                <section>
                    <Routes>
                        {Object.keys(translations).map((langCode) => {
                            let pathLangCode = langCode + "/";
                            if (langCode === "en") {
                                pathLangCode = "";
                            }
                            console.log(pathLangCode)
                            return (<Fragment key={"/" + pathLangCode}>
                                    <Route path={"/" + pathLangCode} element={<Home/>} />
                                    <Route path={"/" + pathLangCode + "category/:categoryName"} element={<CategoryPage/>}/>
                                </Fragment>
                            );
                        })}
                    </Routes>
                </section>
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
