import React, { FC, useState } from 'react';
import styled from 'styled-components';

const  ChartToolWarpper = styled.div<{height:string}>`
    height: ${({height}) => height || '0px'};
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
        color: #FFFFFF;
        font-weight: 600;
        font-size: 18px;
    }
    .right-action{
        display: flex;
        color: #7E96B8;
        font-size: 12px;
        align-items: center;
        .group{
            span{
                margin-right: 18px;
                cursor: pointer;
                transition: all .5s;
                &:nth-last-child(1){
                    margin-right: 0px;
                }
                &.selected{
                    background: #020012;
                    border-radius: 8px;
                    padding: 4px;
                    color: white;
                }
            }
        }
    }
    .line{
        border: 1px solid #4F5864;
        transform: rotate(90deg);
        width: 18px;
        height: 0px;
        margin: 0px 20px;
    }
`;
interface IToolsProps {
    height?: string;
    title?: string;
    selChartOneName?:string
    noUnit?:boolean;
    tabArr: string[];
    tabChange:(item:string)=>void;
    dateChange:(item:string)=>void;
    unitChange:(item:string)=>void;
}

export const ChartTool: FC<IToolsProps> = ({height='30px', title, tabArr = [], selChartOneName,noUnit = false, tabChange, dateChange, unitChange}) => {
    const dateArr = ['Y','M','W'];
    const coinUnitArr = ['USD','ETH'];
    const [selDateKey,setDateKey] = useState(dateArr[0]);
    const [selCoinUnitKey,setSelCoinUnitKey] = useState(coinUnitArr[0]);
    return (
        <ChartToolWarpper height={height}>
            <span className='title'>{title}</span>
            <div className='right-action'>
                {
                    tabArr.length > 0 && <div className='group'>
                        {
                            tabArr.map((item, index) => (
                                <span key={index} className={item == selChartOneName ? 'selected': ''} onClick={()=>{
                                    if(item != selChartOneName) {
                                        tabChange(item)
                                    }
                                }}>{item}</span>
                            ))
                        }
                    </div>
                }
                <div className='line'></div>
                {
                    <div className='group'>
                        {
                            dateArr.map((item, index) => (
                                <span key={index} className={item == selDateKey ? 'selected': ''} onClick={()=>{
                                    if(item != selDateKey) {
                                        setDateKey(item);
                                        dateChange(item);
                                    }
                                }}>{item}</span>
                            ))
                        }
                    </div>
                }
                {!noUnit &&<div className='line'></div>}
                {
                    !noUnit && <div className='group'>
                        {
                            coinUnitArr.map((item, index) => (
                                <span key={index} className={item == selCoinUnitKey ? 'selected': ''} onClick={()=>{
                                    if(item != selCoinUnitKey) {
                                        setSelCoinUnitKey(item);
                                        unitChange(item);
                                    }
                                }}>{item}</span>
                            ))
                        }
                    </div>
                }
            </div>
        </ChartToolWarpper>
    );
}