import {Link} from "react-router-dom";

const BackButton = () => {
	return <div style={{textAlign: 'left'}}>
		<Link to={"/"}>
			<div className={'back-button'}>
				{'<'} Back to List
			</div>
		</Link>
	</div>;
};

export default BackButton;
