import styled from "styled-components";
import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useEffect, useRef } from "react";

const OverViewWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
	padding: 0 50px 0 46px;
`;

const OverViewBox = styled.div`
    border: 1px solid rgba(199, 182, 249, 0.12);
    box-sizing: border-box;
    backdrop-filter: blur(100px);
    border-radius: 16px;
    height: 146px;
	display: flex;
	padding: 0 20px;
	align-items: center;
	justify-content: space-evenly;
    .box{
		flex: 1;
		font-size: 14px;
		line-height: 150%;
		display: flex;
		justify-content: center;
      	.left{
			display: flex;
			flex-direction: column;
			margin-right: 12px;
			span{
				color: #7E96B8;
			}
    	}
		.right{
			display: flex;
			flex-direction: column;
        	span{
				color: white;
			}
     	}
    }
`;

const ChartWapper = styled.div`
	flex: 1;
	margin: 26px 0 20px 0;
	background: #060A0F;
	position: relative;
`;
const ChartTypeWarpper = styled.div`
	position: absolute;
	left: 10px;
	top: 10px;
	background: #131823;
	border-radius: 8px;
	display: flex;
	align-items: center;
	height: 30px;
	padding: 0 10px;
	span{
		color: #7E96B8;
		font-size: 12px;
		margin-right: 14px;
		cursor: pointer;
		z-index: 10000;
		transition: all .2s;
		&.active{
			background: #020012;
			border-radius: 8px;
			padding: 4px;
		}
	}
`;

const Chart: React.FC = () => {
	const options = {
	  grid: { top: 0, right: 20, bottom: 26, left: 20},
	  xAxis: {
		type: 'category',
		boundaryGap: false,
		data: ['1', '2', '3', '4', '5', '6', '7','8','9']
	  },
	  axisLine:{
		show: false
	  },
	  yAxis: {
		show: false
	  },
	  series: [
		{
		  data: [30, 40, 50, 100, 150, 400, 20, 200, 100],
		  type: 'line',
		  lineStyle: {
			width: 2,
			color:'rgba(18, 220, 246, 1)'
		  },
		  areaStyle: {
			color:'rgba(18, 220, 246, 1)'
		  }
		}
	  ]
	};
	return <ReactECharts option={options} />;
};

const OverView = () => {
	const chartTypeList = ['All','1x1','3x3','6x6','12x12','24x24'];
	const [chartType,setChartType] = useState(chartTypeList[0]);
	return (
		<OverViewWrapper>
			<OverViewBox>
				<div className="box">
					<div className="left">
						<span>Token:</span>
						<span>Contract:</span>
						<span>Price:</span>
						<span>Land volume(24hrs):</span>
						<span>Traders(24hrs):</span>
					</div>
					<div className="right">
						<span>$SAND</span>
						<span>0x391f....051074</span>
						<span>$5.6</span>
						<span>$2m</span>
						<span>462</span>
					</div>
				</div>
				<div className="box">
					<div className="left">
						<span>Floor price:</span>
						<span>Total nuber:</span>
						<span>Listed:</span>
						<span>Booked by sandbox:</span>
						<span>Land size ratio:</span>
					</div>
					<div className="right">
						<span>3.02 ETH</span>
						<span>15762</span>
						<span>5762</span>
						<span>3762</span>
						<span>1x1, 3x3, 6x6, 12x12, 24x24</span>
					</div>
				</div>
				<div className="box">
					<div className="left">
						<span>Vancancy rate:</span>
						<span>Listing rate:</span>
						<span>Land number:</span>
						<span>Land market cap:</span>
						<span>Landmark:</span>
					</div>
					<div className="right">
						<span>23.68%</span>
						<span>23.68%</span>
						<span>2,319,210</span>
						<span>$5,702,118,980</span>
						<span>1,234</span>
					</div>
				</div>
			</OverViewBox>
			<ChartWapper>
				<ChartTypeWarpper>
					{
						chartTypeList.map(item=><span key={item} className={item == chartType ? 'active' : ''} onClick={()=>{
							if(item != chartType) {
								setChartType(item);
							}
						}}>{item}</span>)
					}
				</ChartTypeWarpper>
				<Chart></Chart>
			</ChartWapper>
		</OverViewWrapper>
	)
}

export default OverView;
