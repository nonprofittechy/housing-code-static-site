import {useContext, useEffect, useState} from "react";
import {ChecklistContext, LanguageCodeContext, WindowWidthContext} from "./App";
import CallToAction from "./components/CallToAction";
import CategoryButton from "./components/CategoryButton";
import translations from "./translations.json";
import InfoBox from "./components/InfoBox";
const Home = () => {
	const [checklist, setChecklist] = useContext(ChecklistContext);
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);
	const [windowWidth, setWindowWidth] = useContext(WindowWidthContext);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		if (checklist) {
			// get the names of each category
			let data = [...checklist];
			console.log(data);
			data.shift(); // remove row with names of columns
			const cats = {};
			data.forEach((row) => {
				if(row[0] !== "") {
					cats[row[2]] = true;
				}
			});
			setCategories(Object.keys(cats));
		}

	}, [checklist])

	return <div>
		<CallToAction/>
		<h2 id={'responsibilities'}>{translations[languageCode]["Read about your landlord's responsibilities"]}:</h2>
		{
			categories.map((categoryName, index) => {
				if(windowWidth < 400) {
					return <CategoryButton key={index} name={categoryName}/>
				}
				if(index % 2 === 0) {
					return <div key={index} className="row">
						<div className="column">
							<CategoryButton name={categoryName}/>
						</div>
						<div className="column">
							{index + 1 < categories.length ?
								<CategoryButton name={categories[index + 1]}/>
								: null}
						</div>
					</div>
				}
			})
		}
		<br/>
		<InfoBox/>
	</div>

};
export default Home;
