import React from 'react';
import EventListener from 'react-event-listener';
import { connect } from 'react-redux';
import { ICONS } from '../../config/constants';
import STRINGS from '../../config/localizedStrings';
import {
	NotificationWraper,
	NotificationContent,
	InformationRow
} from './Notification';
import { Button } from '../';
import { formatToCurrency } from '../../utils/currency';

const generateRows = ({ order, pairData }, coins) => {
	const { type, side, price, size, orderFees, orderPrice } = order;
	const secondaryCurrency = pairData.pair_2.toUpperCase();
	const secondaryFormat = coins[pairData.pair_2] || {};
	const baseCurrency = pairData.pair_base.toUpperCase();
	const baseFormat = coins[pairData.pair_base] || {};
	const rows = [];

	rows.push({
		label: STRINGS.TYPE,
		value: (
			<div className="text-capitalize">
				{STRINGS.formatString(
					STRINGS.CHECK_ORDER_TYPE,
					STRINGS.TYPES_VALUES[type],
					STRINGS.SIDES_VALUES[side]
				)}
			</div>
		)
	});

	rows.push({
		label: STRINGS.SIZE,
		value: STRINGS.formatString(
			STRINGS[`${baseCurrency}_PRICE_FORMAT`],
			formatToCurrency(size, baseFormat.min),
			STRINGS[`${baseCurrency}_CURRENCY_SYMBOL`]
		)
	});

	if (type === 'limit') {
		rows.push({
			label: STRINGS.PRICE,
			value: STRINGS.formatString(
				STRINGS[`${baseCurrency}_PRICE_FORMAT`],
				formatToCurrency(price, secondaryFormat.min),
				STRINGS[`${secondaryCurrency}_CURRENCY_SYMBOL`]
			)
		});
	}

	rows.push({
		label: STRINGS.FEE,
		value: STRINGS.formatString(
			STRINGS[`${baseCurrency}_PRICE_FORMAT`],
			formatToCurrency(orderFees, secondaryFormat.min),
			STRINGS[`${secondaryCurrency}_CURRENCY_SYMBOL`]
		)
	});

	rows.push({
		label: STRINGS.TOTAL_ORDER,
		value: STRINGS.formatString(
			STRINGS[`${baseCurrency}_PRICE_FORMAT`],
			formatToCurrency(orderPrice, secondaryFormat.min),
			STRINGS[`${secondaryCurrency}_CURRENCY_SYMBOL`]
		)
	});

	return rows;
};

const OrderDisplay = ({ rows }) => {
	return (
		<NotificationContent>
			{rows.map((row, index) => <InformationRow {...row} key={index} />)}
		</NotificationContent>
	);
};

const NewOrderNotification = ({ type, data, coins, onBack, onConfirm }) => {
	const rows = generateRows(data, coins);
	const onConfirmClick = () => {
		onConfirm();
		onBack();
	};

	const onKeydown = ({ key }) => {
		if (key === 'Enter') {
			onConfirmClick();
		}
	};

	return (
		<NotificationWraper
			title={STRINGS.CHECK_ORDER}
			icon={ICONS.CHECK_ORDER}
			className="new-order-notification"
		>
			<EventListener target="document" onKeydown={onKeydown} />
			<OrderDisplay rows={rows} />
			<div className="d-flex">
				<Button label={STRINGS.BACK_TEXT} onClick={onBack} />
				<div className="separator" />
				<Button label={STRINGS.CONFIRM_TEXT} onClick={onConfirmClick} />
			</div>
		</NotificationWraper>
	);
};

const mapStateToProps = (state) => ({
	coins: state.app.coins
});

export default connect(mapStateToProps)(NewOrderNotification);
