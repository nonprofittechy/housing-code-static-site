import {Link, useParams} from "react-router-dom";
import {ChecklistContext} from "./App";
import {useContext, useEffect, useState} from 'react';
import * as Papa from "papaparse";
import BackButton from "./components/BackButton";
import CallToAction from "./components/CallToAction";

const CategoryPage = () => {
	let params = useParams();
	const [checklist, setChecklist] = useContext(ChecklistContext);
	const [descriptions, setDescriptions] = useState([]);
	const [relevantChecklistIndices, setRelevantChecklistIndices] = useState([]);


	useEffect(() => {
		if(checklist) {
			console.log("In category page, checklist", checklist);
			let data = [...checklist];
			data.shift(); // remove row with names of columns
			const desc = [];
			const relevant = [];
			data.forEach((row, idx) => {
				if(row[2] === params.categoryName) {
					relevant.push(idx + 1); // bc removed the first row
					console.log(row)
					desc.push(row[4]);
				}
			});
			setRelevantChecklistIndices(relevant);
			setDescriptions(desc);
		}
	}, [checklist])


	return <div>
		<BackButton/>
		<h2>Problems with {params.categoryName}</h2>
		{descriptions.map((description, index) => {
			const isEven = index % 2 === 0;
				return <div id={index} className={'section'} style={{backgroundColor: isEven ? '#EEEEEE' : "white"}}>
					<div style={{width: '70%', margin: '0 auto'}}>
						<h3>{description}</h3>
						<div style={{textAlign: 'left'}}>{checklist[relevantChecklistIndices[index]][6]}</div>
						<div>&nbsp;</div>
						<div>Housing Code: {checklist[relevantChecklistIndices[index]][8]}</div>
					</div>
				</div>;
		})}
		<CallToAction/>
		<BackButton/>
		</div>
}

export default CategoryPage
