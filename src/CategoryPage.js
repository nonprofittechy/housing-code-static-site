import {useParams} from "react-router-dom";
import {ChecklistContext} from "./App";
import {useContext, useEffect, useState} from 'react';
import BackButton from "./components/BackButton";
import CallToAction from "./components/CallToAction";

const CategoryPage = () => {
	let params = useParams();
	const [checklist, setChecklist] = useContext(ChecklistContext);
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
					desc.push(row[4]);
				}
			});
			setRelevantChecklistIndices(relevant);
			setDescriptions(desc);
		}
	}, [checklist])


	return <div>
		<BackButton/>
		<div className={"section"}>
			<h2>
				Are you having problems with {params.categoryName.toLowerCase()} in your Massachusetts apartment?
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
