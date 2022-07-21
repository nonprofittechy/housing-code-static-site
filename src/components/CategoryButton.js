import {Link} from "react-router-dom";
import iconAssignments from "../iconAssignments.json";

const CategoryButton = (props) => {


	return <Link to={"/category/" + props.name} className={"link-no-decoration"} {...props}>
				<div className={'category-button'} >
					<span>
					<i className={"fa " + iconAssignments[props.name]} aria-hidden="true">&nbsp;</i>
						{props.name}
					</span>
				</div>
		</Link>;
};

export default CategoryButton;
