const UpToCodeLogo = props => {
	return  <a className={'link'} style={{padding: "20px"}} href={"https://madeuptocode.org"}>
		<div>
			<img src={process.env.PUBLIC_URL + "/logoWithText.svg"} width={200}/>
		</div>
		madeuptocode.org
	</a>
}

export default UpToCodeLogo;
