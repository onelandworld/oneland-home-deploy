import styled from "styled-components";
import ReactECharts from 'echarts-for-react';
import CommonBtn from "./common/commonBtn";
const MapDrawerWapper = styled.div`
    background: #131823;
    border: 1px solid rgba(199, 182, 249, 0.1);
    border-radius: 16px;
    position: absolute;
    z-index: 2;
    width: 352px;
    height: 100%;
    right: 0;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    .close{
        width: 26px;
        position: absolute;
        right: 20px;
        cursor: pointer;
    }
    .people{
        width: 127px;
        height: 127px;
        align-self: center;
    }
    .black{
        padding: 20px 10px 20px 12px;
        background: #07090F;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
    }
    .contribute {
        height: 64px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 10px 0;
        div {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            line-height: 150%;
            
            .name {
                color: #7E96B8;
            }

            .value {
                color: white;
            }
        }
    }
    .price {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        line-height: 150%;
        .price-name {
            color: #7E96B8;
        }
        .price-value {
            color: #F33ABF;
            font-weight: bold;
        }
    }
    .btns {
        display: flex;
        justify-content: space-between;
        padding: 14px 0;

        & > div:first-child {
            margin-right: 14px;
        }
    }

`;
const WhiteSpan = styled.span<{size?:string}>`
    font-size: ${({size}) => size || '24px'};
    color: white;
    line-height: 140%;
    font-weight: 500;
`
const GreySpan = styled.span<{size?:string,marginBottom?:string}>`
    font-size: ${({size}) => size || '14px'};
    color: #7E96B8;
    line-height: 150%;
    margin-bottom: ${({marginBottom}) => marginBottom};
`
const GreySpanTwo = styled.span<{size?:string,marginTop?:string}>`
    font-size: ${({size}) => size || '16px'};
    margin-top: ${({marginTop}) => marginTop};
    color: #7E96B8;
    height: 32px;
    line-height: 24px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(199, 182, 249, 0.1);
    margin-bottom: 10px;
`;
const ChartBox = styled.div`
    height: 200px;
    canvas{
        height: 200px !important;
    }
`;
const Chart: React.FC = () => {
    const options = {
    //   grid: { top: 0, right: 20, bottom: 26, left: 20},
      xAxis: {
		type: 'category',
		boundaryGap: false,
        show:false,
		data: ['1', '2', '3', '4', '5', '6']
	  },
      axisLine:{
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          data: [30, 40, 50, 20, 60, 40],
          type: 'line',
          symbol: 'none',
          lineStyle: {
            width: 2, //外边线宽度
            color: '#06E694' //外边线颜色
          },
          smooth: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(26, 247, 114, 0.5)' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(26, 247, 114, 0)' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    };
    return <ReactECharts option={options} />;
};
interface IProps{
    close:Function
}
const MapDrawer = (props:IProps) => {
    return (
        <MapDrawerWapper onClick={(e)=>{
            e.stopPropagation()
        }}>
            <img src="images/close.svg" alt="" className="close" onClick={()=>{
                props.close()
            }}/>
            <img src="images/people1.svg" alt="" className="people"/>
            <WhiteSpan>#Land (-46, -110) </WhiteSpan>
            <GreySpan>@Disctrict 1</GreySpan>
            <GreySpan>Owner: 0xb7e390707864a....f98a707afe43f</GreySpan>
            <div className="black">
                <GreySpan>“The first of many or the first and only :)”</GreySpan>
            </div>
            <div className="contribute">
                <div>
                    <span className="name">Size</span>
                    <span className="value">6x6 (36 parcels)</span>
                </div>
                <div>
                    <span className="name">Heat</span>
                    <span className="value">22%</span>
                </div>
                <div>
                    <span className="name">value index</span>
                    <span className="value">9</span>
                </div>
            </div>
            <div className="price">
                <span className="price-name">Current Price</span>
                <span className="price-value">3.5 ETH</span>
            </div>
            <GreySpan>Price History</GreySpan>
            <ChartBox>
                <Chart></Chart>
            </ChartBox>
            <div className="btns">
                <CommonBtn
                    onClick={() => {
                    }}
                    mode='light'
                    text='Buy'
                />
                <CommonBtn
                    onClick={() => {
                    }}
                    mode='grey'
                    text='Discuss'
                />
            </div>
            <GreySpanTwo marginTop="30px">Land Info</GreySpanTwo>
            <div className="contribute">
                <div>
                    <span className="name">Contract</span>
                    <span className="value">6x6 (36 parcels)</span>
                </div>
                <div>
                    <span className="name">Token ID</span>
                    <span className="value">52%</span>
                </div>
                <div>
                    <span className="name">Token Standard</span>
                    <span className="value">ERC721</span>
                </div>
                <div>
                    <span className="name">Blockchain</span>
                    <span className="value">Ethereum</span>
                </div>
            </div>
            <GreySpanTwo marginTop="30px">History</GreySpanTwo>
            <WhiteSpan size="14px">0xe23f...07ab </WhiteSpan>
            <GreySpan> Put on sale for <WhiteSpan size="14px">10 ETH</WhiteSpan></GreySpan>
            <GreySpan marginBottom="20px"> 3 months ago</GreySpan>
            <WhiteSpan size="14px">0xe23f...07ab </WhiteSpan>
            <GreySpan> Put on sale for <WhiteSpan size="14px">10 ETH</WhiteSpan></GreySpan>
            <GreySpan marginBottom="20px"> 3 months ago</GreySpan>
            <WhiteSpan size="14px">0xe23f...07ab </WhiteSpan>
            <GreySpan> Put on sale for <WhiteSpan size="14px">10 ETH</WhiteSpan></GreySpan>
            <GreySpan marginBottom="20px"> 3 months ago</GreySpan>
        </MapDrawerWapper>
    )
}

export default MapDrawer;
