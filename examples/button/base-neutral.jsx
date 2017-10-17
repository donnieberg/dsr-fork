import React from 'react';

import IconSettings from '~/components/icon-settings';
import Button from '~/components/button'; // `~` is replaced with design-system-react at runtime

const Example = React.createClass({
	displayName: 'ButtonExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<div className="-x-small-buttons--horizontal">
					<Button
						label="Base"
						onClick={function (e) { console.log('Base Button e.target:', e.target); }}
						variant="base"
					/>

					<Button
						label="Neutral"
					/>

					<Button
						iconName="download"
						iconPosition="left"
						label="Neutral Icon"
					/>

					<Button
						label="Responsive"
						responsive
					/>
				</div>
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
