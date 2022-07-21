import {Link} from "react-router-dom";

const CategoryButton = (props) => {

	const iconAssignments = {
		"General Maintenance": "fa-screwdriver-wrench",
		"Bathroom": "fa-bath",
		"Kitchen": "fa-utensils",
		"Bedroom": "fa-bed",
		"Living area": "fa-couch",
		"Building Structure": "fa-helmet-safety",
		"Safety": "fa-unlock-keyhole",
		"Water": "fa-faucet",
		"Exits": "fa-door-open",
		"Heat": "fa-temperature-full",
		"Garbage": "fa-trash-can",
		"Rodents and insects": "fa-bug",
		"Electricity and Gas": "fa-plug",
		"Lighting": "fa-lightbulb",
		"Ventilation and Light": "fa-sun",
		"Lead paint": "fa-paint-roller",
		"Porch and balcony": "fa-store"
	}

	return <div className={'category-button'} {...props}>
		{/*<Link to={"/category/" + props.name}>*/}
				<div >
					{/*<div style={{marginRight: '10px'}}>*/}
					<i className={"fa " + iconAssignments[props.name]} aria-hidden="true">&nbsp;</i>
					{props.name}
				</div>
		{/*</Link>*/}
	</div>;
};

export default CategoryButton;
