/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const propTypes = {
	/*
	 * Assistive Text to use instead of a visible label
	 */
	assistiveText: PropTypes.object,
	/*
	 * Id of the input associated with this label
	 */
	htmlFor: PropTypes.string,
	/*
	 * Input Label
	 */
	label: PropTypes.string,
	/*
	 * Applies label styling for a required form element
	 */
	required: PropTypes.bool,
	/**
	 * Changes markup of label.
	 */
	variant: PropTypes.oneOf(['base', 'static'])
};

const defaultProps = {
	variant: 'base'
};

/*
 * Form label. This returns null if there is no label text (hidden or shown)
 */

const Label = React.createClass({
	render () {
		const labelText = this.props.label
			|| (this.props.assistiveText && this.props.assistiveText.label); // One of these is required to pass accessibility tests

		const subRenders = {
			base: (<label
				className={classNames('slds-form-element__label', {
					'slds-assistive-text': this.props.assistiveText && !this.props.label
				})}
				htmlFor={this.props.htmlFor}
			>
				{this.props.required && <abbr className="slds-required" title="required">*</abbr>}
				{labelText}
			</label>),
			static: (<span className="slds-form-element__label">{labelText}</span>)
		};

		return (
			labelText
			? subRenders[this.props.variant]
			: null
		);
	}
});

Label.displayName = 'Label';
Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
