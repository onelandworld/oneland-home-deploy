import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { shortStr } from "../../../lib/utils";
import { SERVICE_ADDRESS } from "../../constants";


const ActivityWarpper = styled.div`
    flex:1;    
    margin: 20px 0 70px 0px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(100px);
    border-radius: 16px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
    .title{
        margin: 26px 0 36px 0;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 14px;
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
            div{
                flex: 1;
                display: flex;
                align-items: center;
                img{
                    margin-right: 6px;
                    &.nft-image{
                        width: 24px;
                        height: 24px;
                    }
                }
                span{
                    color: #FFFFFF;
                    font-weight: 600;
                    font-size: 14px;
                }
            }
        }
    }
`

export const MetaverseActivity: React.FC = () => {
    const thArr = ['NFT', 'Action', 'Price', 'From', 'To','Date'];
    const [tableData,setTableData] = useState([]);
    useEffect(()=>{
        getTableData();
    },[])
    const getTableData = async () =>{
        const res = await axios.get(
            `${SERVICE_ADDRESS}metaverses/project/1/activities`
        );
        if(res.data.code == 200) {
            setTableData(res.data.data)
        }
    }
    const getType = (type:number) => {
        let returnStr = '';
        switch (type) {
            case 0:
                returnStr = 'transfer'
                break;
            case 1:
                returnStr = 'mint'
                break;
            case 2:
                returnStr = 'burn'
                break; 
            case 3:
                returnStr = 'migration'
                break;
            default:
                break;
        }
        return returnStr;
    }
    return (
        <ActivityWarpper>
            <div className="title">All Historical Activities</div>
            <div className="table">
                <div className="th">
                    {
                        thArr.map(item=><span key={item}>{item}</span>)
                    }
                </div>
                {
                    tableData.map((item:any) => {
                        return <div className="tr">
                            <div>
                                {
                                    item.metadata ? <>
                                        <img src={item.metadata.image} className="nft-image" alt="" />
                                        <span>{item.metadata.name}</span>
                                    </> : ''
                                }
                            </div>
                            <div>
                                <img src="images/send.svg" alt="" />
                                <span>{getType(item.type)}</span>
                            </div>
                            <div>
                                <span>{item.price}</span>
                            </div>
                            <div>
                                <span>{shortStr(item.from)}</span>
                            </div>
                            <div>
                                <span>{shortStr(item.to)}</span>
                            </div>
                            <div>
                                <span>{moment(item.timestamp).format("YYYY-MM-DD")}</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </ActivityWarpper>
    )
}