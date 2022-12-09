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

    // For expansion animation to work, actual `nav` that
    // does the collapsing and expanding must not be in a function.
    // Looks like it might be something to do with the lifecycle.
    const HeaderNavItem = props => {
        return <li onClick={() => closeNav()} className={ props.className || '' }>
            <a className={'header-link link-no-decoration'} href={ props.to }>
                <span className={'header-link-text'}>{ props.contents }</span>
            </a>
        </li>
    }

    const headerNavLinks = [
        <ul>
            <HeaderNavItem to='https://getuptocode.org/about/' contents='About'/>
            <HeaderNavItem to='https://getuptocode.org/faqs/' contents='FAQs'/>
            <HeaderNavItem to='https://getuptocode.org/find-your-inspector/' contents='Find Your Inspector'/>
            <HeaderNavItem className='header-item-current' to={languageCode === "en" ? "/" : "/" + languageCode + "/"} contents='Read the Code'/>
        </ul>
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
                        <span class="language-link">{languageCode === "en" ? "Español" : "English"}</span>
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
                            <nav id='header_nav'>{ headerNavLinks }</nav>
                        </div>

                        <div id='header_nav_container_1024' className='header-part' aria-hidden={(windowWidth < 1024) ? "false" : "true"}>
                            <div className='toggle'>
                                <div onClick={toggleNav} className='hamburger'>{navbarOpen ? "^" : "v"}</div>
                            </div>
                            <nav id='header_nav' aria-hidden={navbarOpen ? 'false' : 'true'} className={navbarOpen ? 'expanded' : 'collapsed'}>
                                { headerNavLinks }
                            </nav>
                        </div>

                    </div>
                </section>
                <div className={'divider-container'}><div class={'divider'}></div></div>
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
                <section id={'footer'}>
                    <div id={'footer_container'}>
                        <UpToCodeLogo/>
                        <p id="footer_resources">If you are being evicted, use the <a href="https://www.gbls.org/MADE" className="link">free MADE website</a> to fight your eviction.</p>
                    </div>
                </section>
                <div id={'footer_divider'} className={'divider-container'}><div class={'divider'}></div></div>
                <section id="copyright">
                    <p>© { new Date().getFullYear() } All Rights Reserved.</p>
                </section>
            </div>
        </ChecklistContext.Provider>
        </LanguageCodeContext.Provider>
        </WindowWidthContext.Provider>
    );
}

export default App;
