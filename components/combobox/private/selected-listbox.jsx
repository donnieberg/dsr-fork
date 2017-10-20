/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Pill from '../../utilities/pill';

import classNames from 'classnames';
import isEqual from 'lodash.isequal';

import { shape } from 'airbnb-prop-types';

const propTypes = {
	/*
	 * The option object within the selection prop that should have focus.
	 */
	activeOption: PropTypes.object,
	/*
	 * The index of the option object within the selection prop that should have focus.
	 */
	activeOptionIndex: PropTypes.number,
	/**
	 * **Assistive text for accessibility**
	 * This object is merged with the default props object on every render.
	 * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
	 * * `removePill`: Aids in keyboard interaction with Pills.
	 */
	assistiveText: shape({
		label: PropTypes.string,
		removePill: PropTypes.string
	}),
	/*
	 * Callback called when pill is clicked, delete is pressed, or backspace is pressed.
	 */
	events: shape({
		onClickPill: PropTypes.func.isRequired,
		onRequestFocus: PropTypes.func.isRequired,
		onRequestFocusOnNextPill: PropTypes.func.isRequired,
		onRequestFocusOnPreviousPill: PropTypes.func.isRequired,
		onRequestRemove: PropTypes.func.isRequired
	}),
	/**
	 * HTML id for Combobox
	 */
	id: PropTypes.string,
	/**
	 * Adds inline (inside of input) styling
	 */
	isInline: PropTypes.bool,
	/*
	 * Pill Label
	 */
	labels: shape({
		label: PropTypes.string,
		remove: PropTypes.string,
		title: PropTypes.string
	}),
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	renderAtSelectionLength: PropTypes.number,
	/**
	 * Accepts an array of item objects.
	 */
	selection: PropTypes.array,
	/**
	 * Requests that the active option set focus on render
	 */
	listboxHasFocus: PropTypes.bool,
	/**
	 * Changes styles of the input. Currently `entity` is not supported.
	 */
	variant: PropTypes.oneOf(['base', 'inline-listbox', 'readonly'])
};

const defaultProps = {
	renderAtSelectionLength: 1
};

const SelectedListBox = React.createClass({
	render () {
		return (
			this.props.selection.length >= this.props.renderAtSelectionLength ?
				<div // eslint-disable-line jsx-a11y/role-supports-aria-this.props
					id={`${this.props.id}-selected-listbox`}
					role="listbox"
					aria-orientation="horizontal"
				>
					<ul
						className={classNames(
							'slds-listbox', {
								'slds-listbox--inline': this.props.isInline,
								'slds-listbox_horizontal': !this.props.isInline,
								'slds-p-top_xxx-small': !this.props.isInline
							}
						)}
						role="group"
						aria-label={this.props.assistiveText.selectedListboxLabel}
					>
						{this.props.selection.map((option, renderIndex) => {
							const setActiveBasedOnstateFromParent = renderIndex === this.props.activeOptionIndex
								&& isEqual(option, this.props.activeOption);
							const listboxRenderedForFirstTime =
								(this.props.activeOptionIndex === -1 && renderIndex === 0)
								|| (this.props.variant === 'readonly'
									&& this.props.selection.length !== 1
									&& renderIndex === 0);
							const active = setActiveBasedOnstateFromParent || listboxRenderedForFirstTime;
							const icon = option.icon
								? React.cloneElement(option.icon, {
									containerClassName: 'slds-pill__icon_container'
								})
								: null;

							return (
								<li
									role="presentation"
									className="slds-listbox__item"
									key={`${this.props.id}-list-item-${option.label}`}
								>
									<Pill
										active={active}
										assistiveText={{
											remove: this.props.assistiveText.removePill
										}}
										events={{
											onBlur: this.props.events.onBlurPill,
											onClick: (event, data) => {
												this.props.events.onClickPill(event, { ...data, index: renderIndex });
											},
											onRequestFocusOnNextPill: this.props.events.onRequestFocusOnNextPill,
											onRequestFocusOnPreviousPill: this.props.events.onRequestFocusOnPreviousPill,
											onRequestRemove: (event, data) => {
												this.props.events.onRequestRemove(event, { ...data, index: renderIndex });
											},
											onRequestFocus: this.props.events.onRequestFocus
										}}
										eventData={{ option }}
										icon={icon}
										labels={{
											label: option.label,
											removeTitle: this.props.labels.removePillTitle
										}}
										requestFocus={this.props.listboxHasFocus}
										tabIndex={active ? 0 : -1}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			: null
		);
	}
});

SelectedListBox.displayName = 'SelectedListBox';
SelectedListBox.propTypes = propTypes;
SelectedListBox.defaultProps = defaultProps;

export default SelectedListBox;
