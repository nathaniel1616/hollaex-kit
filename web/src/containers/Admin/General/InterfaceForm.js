import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Button, Checkbox, Form, Input, Modal, Select, message } from 'antd';
import classnames from 'classnames';
import _isEqual from 'lodash/isEqual';

import { STATIC_ICONS } from 'config/icons';
import FormButton from 'components/FormButton/Button';
import { CloseOutlined } from '@ant-design/icons';
const { Item } = Form;

const InterfaceForm = ({
	initialValues = {},
	constants,
	handleSaveInterface,
	isUpgrade,
	buttonSubmitting,
	isFiatUpgrade,
	coins,
}) => {
	const [isSubmit, setIsSubmit] = useState(!buttonSubmitting);
	const [form] = Form.useForm();
	const [referralHistoryData, setReferralHistoryData] = useState({
		earning_rate: constants?.kit?.referral_history_config?.earning_rate || null,
		earning_period:
			constants?.kit?.referral_history_config?.earning_period || null,
		settlement_interval:
			constants?.kit?.referral_history_config?.settlement_interval || null,
		distributor_id:
			constants?.kit?.referral_history_config?.distributor_id || null,
		last_settled_trade:
			constants?.kit?.referral_history_config?.last_settled_trade || null,
		date_enabled:
			constants?.kit?.referral_history_config?.date_enabled || new Date(),
		active: constants?.kit?.referral_history_config?.active,
	});

	const [
		displayReferralHistoryModal,
		setDisplayReferralHistoryModal,
	] = useState(false);

	const handleSubmit = (values) => {
		let formValues = {};
		if (values) {
			formValues = {
				chat: isUpgrade ? false : !!values.chat,
				quick_trade: !!values.quick_trade,
				pro_trade: !!values.pro_trade,
				stake_page: !!values.stake_page,
				cefi_stake: !!values.cefi_stake,
				referral_history_config: !!values.referral_history_config,
				home_page: isUpgrade ? false : !!values.home_page,
				ultimate_fiat: !!values.ultimate_fiat,
				apps: !!values.apps,
			};
			const referral_history_config = {
				active: !!values.referral_history_config,
				earning_rate: !!values.referral_history_config.earning_rate,
				earning_period: !!values.referral_history_config.earning_period,
				settlement_interval: !!values.referral_history_config
					.settlement_interval,
				distributor_id: !!values.referral_history_config.distributor_id,
				last_settled_trade: !!values.referral_history_config.last_settled_trade,
				date_enabled: referralHistoryData.date_enabled,
			};
			handleSaveInterface(formValues, referral_history_config);
		}
	};

	const handleValuesChange = () => {
		if (!_isEqual(initialValues, form.getFieldsValue())) {
			setIsSubmit(false);
		} else {
			setIsSubmit(true);
		}
	};

	const handleSubmitData = (formProps) => {
		if (formProps.referral_history_config && !referralHistoryData.active) {
			setDisplayReferralHistoryModal(true);
		} else {
			setIsSubmit(true);
			handleSubmit(formProps);
		}
	};

	let initialValue = initialValues;
	if (isUpgrade) {
		initialValue.home_page = false;
		initialValue.chat = false;
		initialValue.apps = false;
	}
	return (
		<div className="general-wrapper">
			{displayReferralHistoryModal && (
				<Modal
					maskClosable={false}
					closeIcon={<CloseOutlined style={{ color: 'white' }} />}
					bodyStyle={{
						backgroundColor: '#27339D',
						marginTop: 60,
					}}
					visible={displayReferralHistoryModal}
					width={400}
					footer={null}
					onCancel={() => {
						setDisplayReferralHistoryModal(false);
					}}
				>
					<h2 style={{ fontWeight: '600', color: 'white' }}>
						Referral History Config
					</h2>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Earning Rate
						</div>

						<Input />
					</div>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Earning Rate
						</div>

						<Input />
					</div>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Earning Period
						</div>

						<Input />
					</div>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Settlement Interval
						</div>

						<Input />
					</div>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Distributor ID
						</div>

						<Input />
					</div>

					<div className="mb-5">
						<div style={{ fontSize: 16 }} className="mb-2">
							Last Settle Date
						</div>

						<Input />
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 15,
							justifyContent: 'space-between',
							marginTop: 30,
						}}
					>
						<Button
							onClick={() => {
								setDisplayReferralHistoryModal(false);
							}}
							style={{
								backgroundColor: '#288500',
								color: 'white',
								flex: 1,
								height: 35,
							}}
							type="default"
						>
							Back
						</Button>
						<Button
							onClick={async () => {
								if (!referralHistoryData.currency) {
									message.error('Please Select currency');
									return;
								}
								setIsSubmit(true);
								handleSubmit(form.getFieldsValue());
								setDisplayReferralHistoryModal(false);
							}}
							style={{
								backgroundColor: '#288500',
								color: 'white',
								flex: 1,
								height: 35,
							}}
							type="default"
						>
							Proceed
						</Button>
					</div>
				</Modal>
			)}

			<div className="sub-title">Features</div>
			<div className="description">
				Select the features that will be available on your exchange.
			</div>
			<Form
				form={form}
				name="interface-form"
				initialValues={initialValue}
				onFinish={handleSubmitData}
				onValuesChange={handleValuesChange}
				className="disable-button"
			>
				<div className="interface-box">
					<Item name="pro_trade" valuePropName="checked">
						<Checkbox className="mt-3">
							<div className="d-flex align-items-center">
								<ReactSVG
									src={STATIC_ICONS.CANDLES_LOGO}
									className="feature-icon mr-1"
								/>
								<div className="ml-2 checkbox-txt">
									Pro trade
									<div className="small-text">
										(Chart, orderbook, limit orders with wallet)
									</div>
								</div>
							</div>
						</Checkbox>
					</Item>
					<Item name="quick_trade" valuePropName="checked">
						<Checkbox className="mt-3">
							<div className="d-flex align-items-center">
								<div className="feature-trade-box mr-1">
									<div className="interface_container">
										<div className="sell">
											<span className="label">SELL</span>
										</div>
										<div className="buy">
											<span className="label">BUY</span>
										</div>
									</div>
								</div>
								<div className="ml-2 checkbox-txt">
									Quick trade
									<div className="d-flex justify-content-between">
										<div className="small-text">
											(Simple buy/sell interface with wallet)
										</div>
									</div>
								</div>
							</div>
						</Checkbox>
					</Item>
					<Item name="stake_page" valuePropName="checked">
						<Checkbox className="mt-3">
							<div className="d-flex align-items-center">
								<div className="feature-trade-box mr-1">
									<ReactSVG
										src={STATIC_ICONS.STAKE_FEATURE}
										className="d-flex feature-icon justify-content-center mr-1 mt-1 ml-3 pl-1"
										beforeInjection={(svg) => {
											svg.setAttribute('style', 'width: 60px');
										}}
									/>
								</div>
								<div className="ml-2 checkbox-txt">
									Defi Staking
									<div className="small-text">
										(Lock coins and distribute crypto rewards for Defi)
									</div>
								</div>
							</div>
						</Checkbox>
					</Item>

					<Item name="cefi_stake" valuePropName="checked">
						<Checkbox className="mt-3">
							<div className="d-flex align-items-center">
								<div className="feature-trade-box mr-1">
									<ReactSVG
										src={STATIC_ICONS.STAKE_FEATURE}
										className="d-flex feature-icon justify-content-center mr-1 mt-1 ml-3 pl-1"
										beforeInjection={(svg) => {
											svg.setAttribute('style', 'width: 60px');
										}}
									/>
								</div>
								<div className="ml-2 checkbox-txt">
									Cefi Staking
									<div className="small-text">
										(Lock coins and distribute crypto rewards for Cefi)
									</div>
								</div>
							</div>
						</Checkbox>
					</Item>

					{!isFiatUpgrade && (
						<Item name="referral_history_config" valuePropName="checked">
							<Checkbox className="mt-3">
								<div className="d-flex align-items-center">
									<ReactSVG
										src={STATIC_ICONS.CANDLES_LOGO}
										className="feature-icon mr-1"
									/>
									<div className="ml-2 checkbox-txt">
										Referral History
										<div className="small-text">
											(User referral history and earning analytics)
										</div>
									</div>
								</div>
							</Checkbox>
						</Item>
					)}

					<div className="d-flex">
						<div
							className={classnames('interface-item', {
								'disabled-area': isFiatUpgrade,
							})}
						>
							<Item name="ultimate_fiat" valuePropName="checked">
								<Checkbox className="mt-3">
									<div className="d-flex align-items-center">
										<div className="feature-trade-box mr-1">
											<ReactSVG
												src={STATIC_ICONS.MPESA_ICON}
												className="d-flex feature-icon justify-content-center mr-2 mt-3 ml-1 pl-1"
												beforeInjection={(svg) => {
													svg.setAttribute('style', 'width: 60px');
												}}
											/>
										</div>
										<div className="ml-2 checkbox-txt">
											Fiat Controls
											<div className="small-text">
												(On & off ramping and tracking for fiat assets)
											</div>
										</div>
									</div>
								</Checkbox>
							</Item>
						</div>
						{isFiatUpgrade && (
							<div className="d-flex">
								<div className="d-flex align-items-center justify-content-between upgrade-section mt-2 mb-5">
									<div>
										<div className="font-weight-bold">
											Powerful fiat ramping
										</div>
										<div>Cash in and out with fiat ramps</div>
									</div>
									<div className="ml-5 button-wrapper">
										<a
											href="https://dash.hollaex.com/billing"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button type="primary" className="w-100">
												Upgrade Now
											</Button>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="d-flex">
						<div
							className={classnames('interface-item', {
								'disabled-area': isUpgrade,
							})}
						>
							<Item name="chat" valuePropName="checked">
								<Checkbox className="mt-3">
									<div className="d-flex align-items-center">
										<div className="feature-trade-box mr-1">
											<ReactSVG
												src={STATIC_ICONS.CHAT_FEATURE_ICON}
												className="feature-chat-icon"
											/>
										</div>
										<div className="ml-2 checkbox-txt">
											Chat system
											<div className="d-flex justify-content-between">
												<div className="small-text">
													(Usernames, text and emoji communication)
												</div>
											</div>
										</div>
									</div>
								</Checkbox>
							</Item>
						</div>
						{isUpgrade && (
							<div className="d-flex">
								<div className="d-flex align-items-center justify-content-between upgrade-section mt-2 mb-5">
									<div>
										<div className="font-weight-bold">
											Start your crypto culture
										</div>
										<div>Allow your users to socialize through chat</div>
									</div>
									<div className="ml-5 button-wrapper">
										<a
											href="https://dash.hollaex.com/billing"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button type="primary" className="w-100">
												Upgrade Now
											</Button>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="d-flex">
						<div
							className={classnames('interface-item', {
								'disabled-area': isUpgrade,
							})}
						>
							<Item name="home_page" valuePropName="checked">
								<Checkbox className="mt-3">
									<div className="d-flex align-items-center">
										<div className="feature-trade-box mr-1">
											<ReactSVG
												src={STATIC_ICONS.HOME_PAGE_FEATURE_ICON}
												className="feature-chat-icon"
											/>
										</div>
										<div className="ml-2 checkbox-txt">
											Homepage
											<div className="d-flex justify-content-between">
												<div className="small-text">
													(This will be the first page seen on your domain)
												</div>
											</div>
										</div>
									</div>
								</Checkbox>
							</Item>
						</div>
						{isUpgrade && (
							<div className="d-flex">
								<div className="d-flex align-items-center justify-content-between upgrade-section mt-2 mb-5">
									<div>
										<div className="font-weight-bold">
											Make a good first impression
										</div>
										<div>Add a customizable landing page</div>
									</div>
									<div className="ml-5 button-wrapper">
										<a
											href="https://dash.hollaex.com/billing"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button type="primary" className="w-100">
												Upgrade Now
											</Button>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="d-flex">
						<div
							className={classnames('interface-item', {
								'disabled-area': isUpgrade,
							})}
						>
							<Item name="apps" valuePropName="checked">
								<Checkbox className="mt-3">
									<div className="d-flex align-items-center">
										<div className="feature-trade-box mr-1">
											<ReactSVG
												src={STATIC_ICONS.APPS_FEATURE_ICON}
												className="feature-apps-icon"
											/>
										</div>
										<div className="ml-2 checkbox-txt">
											Apps
											<div className="d-flex justify-content-between">
												<div className="small-text">
													(Give your users extra exchange applications)
												</div>
											</div>
										</div>
									</div>
								</Checkbox>
							</Item>
						</div>
						{isUpgrade && (
							<div className="d-flex">
								<div className="d-flex align-items-center justify-content-between upgrade-section mt-2 mb-5">
									<div>
										<div className="font-weight-bold">
											First exchange app store
										</div>
										<div>Add more exchange functionality</div>
									</div>
									<div className="ml-5 button-wrapper">
										<a
											href="https://dash.hollaex.com/billing"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button type="primary" className="w-100">
												Upgrade Now
											</Button>
										</a>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<div>
					<FormButton
						type="primary"
						htmlType="submit"
						disabled={isSubmit}
						buttonText="save"
					/>
				</div>
			</Form>
		</div>
	);
};

export default InterfaceForm;
