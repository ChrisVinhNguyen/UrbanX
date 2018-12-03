import React, { Component } from 'react';
import { Button, Icon, Image, Item, Label, Header } from 'semantic-ui-react'
import { Rating, Divider, Transition, Message } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { newTransaction, deleteTransaction, getMyTransactionsForItem } from '../actions/itemsActions';
import PropTypes from 'prop-types';


class FlashMessageContainer extends Component {
	state = { hide: 500, show: 500 }

	render() {
		const { hide, show } = this.state
		let message = null;

		if (this.props.pos_or_neg == 'positive') {
			message = <Message positive floating>
							{this.props.flash_message}
						</Message>
		}
		else if (this.props.pos_or_neg == 'negative') {
			message = <Message negative floating>
								{this.props.flash_message}
						</Message>
		}
		else {
			message = <Message floating>
								{this.props.flash_message}
						</Message>
		}

		return (
		      <Transition duration={{ hide, show }} visible={this.props.visible}>
				{message}
		      </Transition>
		)
	}
}

FlashMessageContainer.propTypes = {
  flash_message: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  flash_message: state.flash.flash_message,
  visible: state.flash.visible,
  pos_or_neg: state.flash.pos_or_neg
});

export default connect(mapStateToProps, {})(FlashMessageContainer);