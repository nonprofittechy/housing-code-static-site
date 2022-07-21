import {useParams} from "react-router-dom";
import {ChecklistContext, LanguageCodeContext} from "./App";
import {useContext, useEffect, useState} from 'react';
import ShowMoreButton from "./components/ShowMoreButton";
import CallToAction from "./components/CallToAction";
import translations from "./translations.json";
import iconAssignments from "./iconAssignments.json";
import InfoBox from "./components/InfoBox";

const CategoryPage = () => {
	let params = useParams();
	const [checklist, setChecklist] = useContext(ChecklistContext);
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);
	const [descriptions, setDescriptions] = useState([]);
	const [relevantChecklistIndices, setRelevantChecklistIndices] = useState([]);


	useEffect(() => {
		if(checklist) {
			let data = [...checklist];
			data.shift(); // remove row with names of columns
			const desc = [];
			const relevant = [];
			data.forEach((row, idx) => {
				if(row[2] === params.categoryName) {
					relevant.push(idx + 1); // bc removed the first row
					desc.push(row[translations[languageCode]["descriptionColumn"]]);
				}
			});
			setRelevantChecklistIndices(relevant);
			setDescriptions(desc);
		}
	}, [checklist, languageCode])


	return <div>
		<ShowMoreButton/>
		<div className={"section"}>
			<h1>
				<i className={"fa " + iconAssignments[params.categoryName]} aria-hidden="true">&nbsp;</i>
				{params.categoryName}
			</h1>
			<h2>
				Are you having problems in your Massachusetts apartment?
			</h2>
			<h3>
				Read below to find out what responsibilities your landlord has to keep your home habitable according to the housing code
			</h3>
		</div>

		{descriptions.map((description, index) => {
			const isEven = index % 2 === 0;
				return <div key={index} className={'section'} style={{backgroundColor: isEven ? '#EEEEEE' : "white"}}>
					<div style={{width: '70%', margin: '0 auto'}}>
						<h3>{description}</h3>
						<div style={{textAlign: 'left'}}>
							{checklist[relevantChecklistIndices[index]][translations[languageCode]["helpColumn"]]}</div>
						<br/>
						<div>
							{
								checklist[relevantChecklistIndices[index]][1].indexOf("24") !== -1 ?
									<mark>Fix deadline: {checklist[relevantChecklistIndices[index]][1]}</mark>
									:<span>Fix deadline: {checklist[relevantChecklistIndices[index]][1]}</span>
							}.
						</div>
						<div>C.M.R. {checklist[relevantChecklistIndices[index]][8]}</div>
					</div>
				</div>;
		})}
		<CallToAction/>
		<InfoBox/>
		<ShowMoreButton/>
		</div>
};

export default CategoryPage
