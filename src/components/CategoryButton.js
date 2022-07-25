import {Link} from "react-router-dom";
import iconAssignments from "../iconAssignments.json";
import {useContext} from "react";
import {LanguageCodeContext} from "../App";
import translations from "../translations.json";

const CategoryButton = (props) => {
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);

	return <Link to={"category/" + props.name} className={"link-no-decoration"} {...props}>
				<div className={'category-button'} >
					<span>
					<i className={"fa " + iconAssignments[props.name]} aria-hidden="true">&nbsp;</i>
						{translations[languageCode][props.name]}
					</span>
				</div>
		</Link>;
};

export default CategoryButton;
