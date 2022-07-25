import translations from "../translations.json";
import {useContext} from "react";
import {LanguageCodeContext} from "../App";
const CallToAction = (props) => {
	const [languageCode, setLanguageCode] = useContext(LanguageCodeContext);

	return <div className={'section'}>
		<h2>{translations[languageCode]["Find out if your home is safe according to the state sanitary code. Get the repairs that you need."]}</h2>
		<a className={'link-no-decoration call-to-action-link button'}
		   href={'https://interviews.gbls.org/start/uptocode'}>
			{translations[languageCode]['Get the repairs I need']}
		</a>
	</div>;
}

export default CallToAction;
