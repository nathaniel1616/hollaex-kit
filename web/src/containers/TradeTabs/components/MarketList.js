import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	SORT,
	toggleSort,
	setSortModeChange,
	setSortModeVolume,
} from 'actions/appActions';
import {
	oneOfType,
	arrayOf,
	shape,
	array,
	object,
	number,
	string,
	func,
} from 'prop-types';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Paginator } from 'components';
import STRINGS from 'config/localizedStrings';
import withConfig from 'components/ConfigProvider/withConfig';
import MarketRow from './MarketRow';
import { EditWrapper } from 'components';

const MarketList = ({
	markets,
	handleClick,
	chartData,
	icons: ICONS,
	page,
	pageSize,
	count,
	goToNextPage,
	goToPreviousPage,
	showPaginator = false,
	loading,
	mode,
	is_descending,
	toggleSort,
	setSortModeChange,
	setSortModeVolume,
}) => {
	const handleClickChange = () => {
		if (mode === SORT.CHANGE) {
			toggleSort();
		} else {
			setSortModeChange();
		}
	};

	const handleClickVolume = () => {
		if (mode === SORT.VOL) {
			toggleSort();
		} else {
			setSortModeVolume();
		}
	};

	const renderCaret = (cell) => (
		<span
			className="mx-1"
			style={{ visibility: mode === cell ? 'visible' : 'hidden' }}
		>
			{is_descending ? <CaretDownOutlined /> : <CaretUpOutlined />}
		</span>
	);

	return (
		<div className="market-list__container">
			<div className="market-list__block">
				<table className="market-list__block-table">
					<thead>
						<tr className="table-bottom-border">
							<th className="sticky-col">
								<div>
									<EditWrapper stringId="MARKETS_TABLE.MARKETS">
										{STRINGS['MARKETS_TABLE.MARKETS']}
									</EditWrapper>
								</div>
							</th>
							<th>
								<div>
									<EditWrapper stringId="MARKETS_TABLE.LAST_PRICE">
										{STRINGS['MARKETS_TABLE.LAST_PRICE']}
									</EditWrapper>
								</div>
							</th>
							<th>
								<div onClick={handleClickChange} className="d-flex pointer">
									{renderCaret(SORT.CHANGE)}
									<EditWrapper stringId="MARKETS_TABLE.CHANGE_24H">
										{STRINGS['MARKETS_TABLE.CHANGE_24H']}
									</EditWrapper>
								</div>
							</th>
							<th>
								<div onClick={handleClickVolume} className="d-flex pointer">
									{renderCaret(SORT.VOL)}
									<EditWrapper stringId="MARKETS_TABLE.VOLUME_24h">
										{STRINGS['MARKETS_TABLE.VOLUME_24h']}
									</EditWrapper>
								</div>
							</th>
							<th>
								<div>
									<EditWrapper stringId="MARKETS_TABLE.CHART_24H">
										{STRINGS['MARKETS_TABLE.CHART_24H']}
									</EditWrapper>
								</div>
							</th>
						</tr>
					</thead>
					<tbody id="market-list_tableBody">
						{markets.map((market, index) => (
							<MarketRow
								index={index}
								icons={ICONS}
								handleClick={handleClick}
								chartData={chartData}
								market={market}
								loading={loading}
							/>
						))}
					</tbody>
				</table>
			</div>
			{showPaginator && (
				<Paginator
					currentPage={page + 1}
					pageSize={pageSize}
					count={count}
					goToPreviousPage={goToPreviousPage}
					goToNextPage={goToNextPage}
				/>
			)}
		</div>
	);
};

MarketList.propTypes = {
	markets: oneOfType([
		arrayOf(
			shape({
				key: string,
				pair: object,
				ticker: object,
				increment_price: number,
				priceDifference: number,
				priceDifferencePercent: string,
			})
		),
		array,
	]).isRequired,
	chartData: object.isRequired,
	handleClick: func.isRequired,
};

const mapStateToProps = ({
	app: {
		sort: { mode, is_descending },
	},
}) => ({
	mode,
	is_descending,
});

const mapDispatchToProps = (dispatch) => ({
	toggleSort: bindActionCreators(toggleSort, dispatch),
	setSortModeVolume: bindActionCreators(setSortModeVolume, dispatch),
	setSortModeChange: bindActionCreators(setSortModeChange, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withConfig(MarketList));
