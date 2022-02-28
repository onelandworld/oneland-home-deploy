import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { beautyNum, shortStr } from "../../../lib/utils";
import { SERVICE_ADDRESS } from "../../constants";
import Chart from "../common/Chart";

const HolderAnalyticsWarpper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: calc(100% - 20px);
    overflow: hidden;
    overflow-y: auto;
    .top{
        display: flex;
        .top-card{
            display: flex;
            flex: 1;
            flex-direction: column;
            height: 352px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(100px);
            border-radius: 16px;
            padding: 20px 20px 0 20px;
            .tools{
                height: 30px;
                display: flex;
                justify-content: space-between;
                padding-right: 23px;
                .title{
                    color: #FFFFFF;
                    font-weight: 600;
                    font-size: 18px;
                }
                .date-group{
                    display: flex;
                    align-items: center;
                    span{
                        color: #7E96B8;
                        font-size: 12px;
                        margin-right: 16px;
                        cursor: pointer;
                        &.selected{
                            background: #020012;
                            border-radius: 8px;
                            padding: 4px;
                            color: white;
                        }
                    }
                }
            }
            .legend{
                display: flex;
                margin: 22px 0 16px 0;
                .info{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    &.mgr{
                        margin-right: 40px;
                    }
                    .left-top{
                        display: flex;
                        align-items: center;
                        .point{
                            width: 6px;
                            height: 6px;
                            border-radius: 100%;
                            background: #12DCF6;
                            &.zi{
                                background: #C748B9;
                            }
                            &.green{
                                background: #32CB9D;
                            }
                        }
                        .name{
                            color: #7E96B8;
                            font-size: 12px;
                            font-weight: 600;
                            margin: 0 4px;
                        }
                    }
                    .left-bottom{
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        .num{
                            color: #FFFFFF;
                            font-size: 16px;
                        }
                        .up{
                            width: 18px;
                            height: 18px;
                        }
                        .perenct{
                            color: #32CB9D;
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
    .middle{
        display: flex;
        margin-top: 20px;
        .pie-card-box{
            flex:1;
            height: 275px;
            padding: 20px 20px 0 20px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(100px);
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            .title{
                color: #FFFFFF;
                font-weight: 600;
                font-size: 18px;
            }
        }
    }
    .bottom{
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(100px);
        border-radius: 16px;
        margin-top: 20px;
        padding: 20px 20px 0 20px;
        .bottom-tools{
            margin: 6px 0 38px 0;
            .title{
                color: #FFFFFF;
                font-weight: 600;
                font-size: 16px;
            }
        }
        .table{
            flex: 1;
            display: flex;
            flex-direction: column;
            .th{
                height: 48px;
                display: flex;
                align-items: center;
                background: #191F2D;
                padding-left: 8px;
                span{
                    flex: 1;
                    &.th-index{
                        width: 36px;
                        flex: initial;
                    }
                    color: #7E96B8;
                    font-weight: 600;
                    font-size: 14px;
                }
            }
            .tr{
                display: flex;
                height: 48px;
                align-items: center;
                padding-left: 8px;
                color: #FFFFFF;
                span{
                    flex: 1;
                    &.tr-index{
                        width: 36px;
                        flex: initial;
                    }
                    &.jump{
                        color: #12DCF6;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;
const SizeWidthBox = styled.div`
    width: 20px;
`
export const HolderAnalytics: React.FC = () => {
    const [holderTrendChart,setHolderTrendChart] = useState({});
    const [holdConcentrationChart,setHoldConcentrationChart] = useState({});
    const [amountDistributionChart,setAmountDistributionChart] = useState({});
    const [periodDistributionChart,setPeriodDistributionChart] = useState({});
    const [holderTrend,setHolderTrend] = useState({} as any);
    const [holderData,setHolderData] = useState([]);
    const thArr = ['Address', 'Lands Owned', 'Holding Value', 'Last Deal'];
    const dateArr = ['Y','M','W'];
    const typeArr = ['Value','NFTS','3M'];
    const [selDateKey,setDateKey] = useState(dateArr[0]);
    const [selTypeKey,setTypeKey] = useState(typeArr[0]);
    useEffect(()=>{
        getHolderTrends();
        getholdConcentration();
        getAmountDistribution();
        getPeriodDistribution();
        getTopHoldersData();
    },[]);
    const getHolderTrends = async ()=>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}holderTrends/project/1/holderTrends`
        );
        if(res.data.code == 200) {
            setHolderTrend(res.data.data);
            const option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    show:false,
                    data: res.data.data.resultList.map((item:any)=>item.date)
                },
                grid: {
                    top: 10, right: 10, bottom: 10, left: 0,
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255,255,255,.2)'
                        }
                    }
                },
                series: [
                    {
                        data: res.data.data.resultList.map((item:any)=>item.holders),
                        type: 'line',
                    },
                ],
                color:['#12DCF6']
            };
            setHolderTrendChart(option);
        }
    }          
    const getholdConcentration = async ()=>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}holderTrends/project/1/holdingConcentration`
        );
        if(res.data.code == 200) {
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 10, right: 10, bottom: 10, left: 0,
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: res.data.data.map((item:any)=>item.year)
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed',
                                color: 'rgba(255,255,255,.2)'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: 'allHolders',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth : 24,
                        data: res.data.data.map((item:any)=>item.allHolders)
                    },
                    {
                        name: 'top100',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth : 24,
                        data: res.data.data.map((item:any)=>item.top100)
                    },
                    {
                        name: 'top10',
                        type: 'bar',
                        stack: 'Ad',
                        emphasis: {
                            focus: 'series'
                        },
                        barWidth : 24,
                        data: res.data.data.map((item:any)=>item.top10)
                    },
                ],
                color:['#12DCF6','#C748B9','#32CB9D']
            };
            setHoldConcentrationChart(option)
        }
    }
    const getAmountDistribution = async ()=>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}holderTrends/project/1/holdingAmountDistribution`
        );
        if(res.data.code == 200) {
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left:160,
                    textStyle:{
                       color:'#fff',
                    },
                    top:'center',
                    orient: 'vertical',
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '60%'],
                        center:['10%','50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data:res.data.data.map((item:any)=>{
                            return {
                                value: item.num,
                                name:`${item.key}               ${item.num}`
                            }
                        })
                    }
                ]
            };
            setAmountDistributionChart(option)
        }
    }
    const getPeriodDistribution = async ()=>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}holderTrends/project/1/holdingPeriodDistribution`
        );
        if(res.data.code == 200) {
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    left:160,
                    textStyle:{
                       color:'#fff',
                    },
                    top:'center',
                    orient: 'vertical',
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '60%'],
                        center:['10%','50%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data:res.data.data.map((item:any)=>{
                            return {
                                value: item.num,
                                name:`${item.key}               ${item.num}`
                            }
                        })
                    }
                ]
            };
            setPeriodDistributionChart(option)
        }
    }
    const getTopHoldersData = async ()=>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}holderTrends/project/1/whales`
        );
        if(res.data.code == 200) {
            setHolderData(res.data.data);
        }
    }
    return (
        <HolderAnalyticsWarpper>
            <section className="top">
                <div className="top-card">
                    <div className="tools">
                        <span className="title">Holder Trends</span>
                        <div className="date-group">
                            {
                                dateArr.map((item, index) => (
                                    <span key={index} className={item == selDateKey ? 'selected': ''} onClick={()=>{
                                        if(item != selDateKey) {
                                            setDateKey(item);
                                        }
                                    }}>{item}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="legend">
                        <div className="info mgr">
                            <div className="left-top">
                                <span className="point zi"></span>
                                <span className="name">Holders</span>
                                <img src="images/tip.svg" alt="" className="tip"/>
                            </div>
                            <div className="left-bottom">
                                <span className="num">{beautyNum(holderTrend?.holders?.value)}</span>
                                <img src="images/up.svg" alt="" className="up"/>
                                <span className="perenct">{(holderTrend?.holders?.delta * 100).toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                    <Chart option={holderTrendChart}></Chart>
                </div>
                <SizeWidthBox></SizeWidthBox>
                <div className="top-card">
                <div className="tools">
                        <span className="title">Holding Concentration</span>
                        <div className="date-group">
                            {
                                typeArr.map((item, index) => (
                                    <span key={index} className={item == selTypeKey ? 'selected': ''} onClick={()=>{
                                        if(item != selTypeKey) {
                                            setTypeKey(item);
                                        }
                                    }}>{item}</span>
                                ))
                            }
                        </div>
                    </div>
                    <div className="legend">
                        <div className="info mgr">
                            <div className="left-top">
                                <span className="point blue"></span>
                                <span className="name">All Holders</span>
                            </div>
                        </div>
                        <div className="info mgr">
                            <div className="left-top">
                                <span className="point zi"></span>
                                <span className="name">Top 100</span>
                                <img src="images/tip.svg" alt="" className="tip"/>
                            </div>
                        </div>
                        <div className="info">
                            <div className="left-top">
                                <span className="point green"></span>
                                <span className="name">Top 10</span>
                                <img src="images/tip.svg" alt="" className="tip"/>
                            </div>
                        </div>
                    </div>
                    <Chart option={holdConcentrationChart}></Chart>
                </div>
            </section>
            <section className="middle">
                <div className="pie-card-box">
                    <span className="title">Holder Distribution by Holding Amount</span>
                    <Chart option={amountDistributionChart}></Chart>
                </div>
                <SizeWidthBox></SizeWidthBox>
                <div className="pie-card-box">
                    <span className="title">Holding Period Analysis</span>
                    <Chart option={periodDistributionChart}></Chart>
                </div>
            </section>
            <section className="bottom">
                <div className="bottom-tools">
                    <span className="title">Top Holders</span>
                </div>
                <div className="table">
                    <div className="th">
                        <span className="th-index">#</span>
                        {
                            thArr.map(item => {
                                return(
                                    <span key={item}>{item}</span>
                                )
                            })
                        }
                    </div>
                    {
                        holderData.map((item: any, index: number) => {
                            return <div className="tr">
                                <span className="tr-index">{index + 1 > 9 ? index + 1 : `0${index+1}`}</span>
                                <span>{shortStr(item.address)}</span>
                                <span>{item.ownerLands}</span>
                                <span>{item.holdingValue}</span>
                                <span className="jump" onClick={()=>{
                                    window.open(`https://etherscan.io/tx/${item.lastDeal.ethHash}`, "_blank");
                                }}>{moment(item.lastDeal.timestamp).format("MMM d,yyyy")} <img src="images/jump.svg" alt="" /></span>
                            </div>
                        })
                    }
                </div>
            </section>
        </HolderAnalyticsWarpper>
    )
}