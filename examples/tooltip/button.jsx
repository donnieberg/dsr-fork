import React from 'react';

import IconSettings from '~/components/icon-settings';
import PopoverTooltip from '~/components/popover-tooltip'; // `~` is replaced with design-system-react at runtime
import Button from '~/components/button';

const Example = React.createClass({
	displayName: 'TooltipExample',

	render () {
		return (
			<IconSettings iconPath="/assets/icons">
				<PopoverTooltip
					align="right"
					content="Tooltip with right alignment"
				>
					<Button label="Hover or focus to Open" />
				</PopoverTooltip>
			</IconSettings>
		);
	}
});

export default Example;	// export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
