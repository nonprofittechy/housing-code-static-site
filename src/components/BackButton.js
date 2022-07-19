import {Link} from "react-router-dom";

const BackButton = () => {
	return <div style={{textAlign: 'left'}}>
		<Link to={"/"}>
			<div className={'back-button'}>
				{'<'} View more of the Massachusetts state sanitary code
			</div>
		</Link>
	</div>;
};

export default BackButton;
