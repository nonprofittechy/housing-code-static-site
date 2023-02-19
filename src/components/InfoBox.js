import translations from "../translations.json";
import {useContext, useState} from "react";
import {LanguageCodeContext} from "../App";

const InfoBox = props => {
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);

	return <div className={props.isYellow ? 'info-box-yellow ' : 'info-box'}>
		<h3>{translations[languageCode]["What is the state sanitary code?"]}</h3>

		<div className={"normal"} style={{textAlign:"left"}}>
			{
				translations[languageCode]["The state sanitary code lists the minimum standards that your landlord " +
				"has to follow to offer a home for rent in Massachusetts. This web page lists all of the rules in " +
				"one place so that you can easily find if your home complies with state law. The mass.gov website " +
				"has more info"]
			}
			<a href={"https://www.mass.gov/regulations/" +
				"105-CMR-41000-minimum-standards-of-fitness-for-" +
				"human-habitation-state-sanitary-code-chapter-ii"}> {translations[languageCode]["here"]}
			</a>.
		</div>
	</div>
}

export default InfoBox;
