/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';

import { shape } from 'airbnb-prop-types';

import Icon from '../../icon';

const propTypes = {
	/*
	 * Active descendant in menu
	 */
	activeOption: PropTypes.object,
	/*
	 * Index of active descendant in menu
	 */
	activeOptionIndex: PropTypes.number,
	/**
	 * CSS classes to be added to tag with `.slds-dropdown`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
	 */
	className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
	/*
	 * Id used for assistive technology
	 */
	inputId: PropTypes.string,
	/**
	 * Determines the height of the menu based on SLDS CSS classes.
	 */
	itemVisibleLength: PropTypes.oneOf([5, 7, 10]),
	/**
	 * **Text labels for internationalization**
	 * This object is merged with the default props object on every render.
	 * * `noOptionsFound`: Custom message that renders when no matches found. The default empty state is just text that says, 'No matches found.'.
	 */
	labels: shape({
		noOptionsFound: PropTypes.string.isRequired
	}),
	/*
	 * Menu options
	 */
	options: PropTypes.array,
	/*
	 * Callback to remove active descendent
	 */
	resetActiveOption: PropTypes.func,
	/*
	 * Callback when option is selected with keyboard or mouse
	 */
	onSelect: PropTypes.func,
	/*
	 * Selected options
	 */
	selection: PropTypes.array,
	/**
	 * Changes styles of the menu option
	 */
	variant: PropTypes.oneOf(['icon-title-subtitle', 'checkbox']),
	isSelected: PropTypes.func,
	assistiveText: PropTypes.object
};

const defaultProps = {};

const Menu = React.createClass({
	getMenuOptions () {
		return this.props.options.map((optionData, index) => {
			const active = (index === this.props.activeOptionIndex
				&& isEqual(optionData, this.props.activeOption));
			const selected = this.props.isSelected({ selection: this.props.selection, option: optionData });

			return (
				<li
					className="slds-listbox__item"
					key={`menu-option-${optionData.id}`}
					role="presentation"
				>
					{{
						'icon-title-subtitle': (
							<span // eslint-disable-line jsx-a11y/no-static-element-interactions
								aria-selected={active}
								id={`${this.props.inputId}-listbox-option-${optionData.id}`}
								className={classNames('slds-media slds-listbox__option',
									'slds-listbox__option_entity slds-listbox__option_has-meta',
									{ 'slds-has-focus': active })}
								onClick={(event) => {
									this.props.onSelect(event, { option: optionData });
								}}
								role="option"
							>
								{optionData.icon
									? <span className="slds-media__figure">
										{optionData.icon}
									</span>
									: null
								}
								<span className="slds-media__body">
									<span className="slds-listbox__option-text slds-listbox__option-text_entity">{optionData.label}</span>
									<span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{optionData.subTitle}</span>
								</span>
							</span>
						),
						checkbox: (
							<span // eslint-disable-line jsx-a11y/no-static-element-interactions
								aria-selected={selected}
								id={`${this.props.inputId}-listbox-option-${optionData.id}`}
								className={classNames('slds-media slds-listbox__option',
									' slds-listbox__option_plain slds-media_small slds-media_center',
									{
										'slds-has-focus': active,
										'slds-is-selected': selected
									})}
								onClick={(event) => {
									this.props.onSelect(event, { selection: this.props.selection, option: optionData });
								}}
								role="option"
							>
								<span className="slds-media__figure">
									<Icon
										className="slds-listbox__icon-selected"
										category="utility"
										name="check"
										size="x-small"
									/>
								</span>
								<span className="slds-media__body">
									<span className="slds-truncate" title={optionData.label}>
										{selected
											? <span className="slds-assistive-text">{this.props.assistiveText.optionSelectedInMenu}</span>
											: null
										} {optionData.label}
									</span>
								</span>
							</span>
						)
					}[this.props.variant]}
				</li>
			);
		});
	},

	render () {
		const menuOptions = this.getMenuOptions();

		return (
			<div id={`${this.props.inputId}-listbox`} role="listbox">
				<ul
					className={classNames('slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid',
						{
							'slds-dropdown_length-with-icon-5': this.props.itemVisibleLength === 5,
							'slds-dropdown_length-with-icon-7': this.props.itemVisibleLength === 7,
							'slds-dropdown_length-with-icon-10': this.props.itemVisibleLength === 10
						},
						this.props.className)}
					role="presentation"
				>
					{ menuOptions.length
						? menuOptions
						:	<li
							className="slds-listbox__item slds-listbox__status"
							role="status"
							aria-live="polite"
						>
							<span className="slds-m-left--x-large slds-p-vertical--medium">{this.props.labels.noOptionsFound}</span>
						</li>
					}
				</ul>
			</div>
		);
	}
});

Menu.displayName = 'Menu';
Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
