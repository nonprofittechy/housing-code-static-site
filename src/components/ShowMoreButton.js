import {Link} from "react-router-dom";
import {LanguageCodeContext} from "../App";
import {useContext} from "react";

const ShowMoreButton = () => {
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);

	return <div style={{textAlign: 'left'}}>
		<Link to={languageCode === "en" ? "/" : "/" + languageCode + "/"}>
			<div className={'button'}>
				View more of the Massachusetts state sanitary code
			</div>
		</Link>
	</div>;
};

export default ShowMoreButton;
