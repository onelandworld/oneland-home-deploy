import { useState } from "react";
import styled from "styled-components"
import MapFilterGroup from "./mapFilterGroup";
import LandListView from "./landListview";
import MapView from "./mapView";
import OverView from "./overView";
import { SandBoxInfo } from "./sandBoxInfo";

const MarketWapper = styled.div`
	padding: 0 0 0 30px;
`;

const RightWapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const TabWapper = styled.div`
	
`;

const AccountWapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
	img {
		margin-right: 12px;
	}
    span {
		font-weight: 600;
		font-size: 18px;
		line-height: 150%;
		color: #FFFFFF;
	}
`;
const TabList = styled.div`
	height: 80px;
	display: flex;
  	align-items: center;
  	justify-content: center;
	cursor: pointer;
	div{
		color: #7E96B8;
		font-size: 16px;
		font-weight: 500;
		display: flex;
  		align-items: center;
		margin-right: 50px;
		position: relative;
		img{
			margin-right: 8px;
		}
		&.active{
			font-weight: bold;
			color: #12DCF6;
			&::after{
				content: " ";
				display: flex;
				width: 20px;
				height: 2px;
				background: #12DCF6;
				position: absolute;
				bottom: -10px;
				left: calc(50% - 10px);
			}
		}
	}
`;

export const MyDashboard: React.FC = () => {
	const selectTabList = [
		{
			key: 'myLands',
			name: 'My Lands',
			icon: 'images/myLand.svg',
			hoverIcon: 'images/myLand-hover.svg'
		},
		{
			key: 'myEarnings',
			name: 'My Earnings',
			icon: 'images/myEarnings.svg',
			hoverIcon: 'images/myEarnings-hover.svg'
		},
		{
			key: 'tradingHistory',
			name: 'Trading History',
			icon: 'images/tradingHistory.svg',
			hoverIcon: 'images/tradingHistory-hover.svg'
		}
	];
	const [selectkey, setSelectKey] = useState(selectTabList[0].key);
	return (
		<MarketWapper>
			<RightWapper>
				<AccountWapper>
					<img src="images/account_icon.svg" alt=""/>
					<span>@0x582....9DfA</span>
				</AccountWapper>
				<TabWapper>
					<TabList>
						{
							selectTabList.map(item => (
								<div key={item.key} className={item.key == selectkey ? 'active' : ''} onClick={() => {
									if (item.key != selectkey) {
										setSelectKey(item.key);
									}
								}}>
									<img src={item.key == selectkey ? item.hoverIcon : item.icon} alt="" />{item.name}
								</div>
							))
						}
					</TabList>
				</TabWapper>
				{
					selectkey == 'myLands' && <LandListView />
				}
				{
					selectkey == 'myEarnings' && <div></div>
				}
				{
					selectkey == 'tradingHistory' && <div></div>
				}
			</RightWapper>
		</MarketWapper>
	);
}
