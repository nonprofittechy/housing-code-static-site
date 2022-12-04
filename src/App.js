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
    const [navbarOpen, setNavbarOpen] = useState(false);

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

    
    const closeNav = () => {
      setNavbarOpen(false);
    }

    const headerNavLinks = [
        <nav id='header_nav' aria-hidden={navbarOpen ? 'false' : 'true'} className={navbarOpen ? 'expanded' : 'collapsed'}>
            <ul>
                <li onClick={() => closeNav()}>
                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/about/">
                        <span className={'header-link-text'}>About</span>
                    </a>
                </li>
                <li onClick={() => closeNav()}>
                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/faqs/">
                        <span className={'header-link-text'}>FAQs</span>
                    </a>
                </li>
                <li onClick={() => closeNav()}>
                    <a class='header-link link-no-decoration' href="https://madeuptocode.org/find-your-inspector/">
                        <span className={'header-link-text'}>Find Your Inspector</span>
                    </a>
                </li>
                <li onClick={() => closeNav()} className={'header-item-current'}>
                    <a className='header-link link-no-decoration' href={languageCode === "en" ? "/" : "/" + languageCode + "/"} >
                        <span className={'header-link-text'} >Read the Code</span>
                    </a>
                </li>
            </ul>
        </nav>
    ];

    const toggleNav = () => {
      setNavbarOpen(prev => !prev);
    }

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
                    <div id='header'>
                        <div className='header-part logo-container'>
                            <UpToCodeLogo/>
                        </div>

                        <div id='header_nav_container_wide' className='header-part' aria-hidden={(windowWidth < 1024) ? "true" : "false"}>
                            { headerNavLinks }
                        </div>
                        <div id='header_nav_container_1024' className='header-part' aria-hidden={(windowWidth < 1024) ? "false" : "true"}>
                            <div className='toggle'>
                                <button onClick={toggleNav} className='hamburger'>{navbarOpen ? "^" : "v"}</button>
                            </div>
                            { headerNavLinks }
                        </div>

                    </div>
                </section>
                <div className={'separator'}/>
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
