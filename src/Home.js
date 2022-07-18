import * as Papa from "papaparse";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ChecklistContext} from "./App";
import CallToAction from "./components/CallToAction";
import CategoryButton from "./components/CategoryButton";

const Home = () => {
	const [checklist, setChecklist] = useContext(ChecklistContext);
	const [categories, setCategories] = useState([]);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setWindowWidth(window.innerWidth);
	});

	useEffect(() => {
		if (checklist) {
			// get the names of each category
			let data = [...checklist];
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
		<h2 id={'responsibilities'}>Read about your landlord's responsibilities:</h2>
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
	</div>

};
export default Home;
