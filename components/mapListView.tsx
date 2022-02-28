import styled from "styled-components";
import MapItem from "./mapItem";
import {useState} from "react";
import MenuList from "./common/menuList";

const MapListViewWapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
    padding: 0 50px 0 20px;
    .sort{
        display: flex;
        justify-content: flex-end;
        position: relative;
        span{
            color: #7E96B8;   
            font-size: 16px;
            &.sortType{
                color: #03FCF7;
                cursor: pointer;
                display: flex;
                align-items: center;
            }
        }
    }
    .listData{
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 18px;
        height: calc(100vh - 195px);
        > div{
            margin: 0 45px 45px 0;
        }
    }
`;

const ScrollBox = styled.div`
    overflow: hidden;
    height: calc(100% - 18px);
    overflow-y: auto;  
`;


const MapListView = ({ hideBtn }: any) => {
    const [selectIndex, setSelectIndex] = useState(0)
    const [showList, setShowList] = useState(false)
    const menuList = [
        {
            name: 'Price',
        },
        {
            name: 'Recently listed',
        },
        {
            name: 'Name',
        },
        {
            name: 'Value index',
        },
        {
            name: 'District',
        },
        {
            name: 'Premium',
        },
    ]
    return (
        <MapListViewWapper>
            <div
                className="sort"
                onMouseEnter={() => setShowList(true)}
                onMouseLeave={() => setShowList(false)}
            >
                <span>sorting : </span>
                <span className="sortType">&nbsp;Land Size&nbsp;<img src="images/arrow_blue.svg" alt=""/></span>
                {showList &&
                    <MenuList
                        menuList={menuList}
                        selectIndex={selectIndex}
                        onClick={(index: number) => {
                            setSelectIndex(index)
                            setShowList(false)
                        }}
                    />
                }
            </div>
            <ScrollBox>
                <div className="listData">
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                    <MapItem hideBtn={hideBtn}></MapItem>
                </div>
            </ScrollBox>
        </MapListViewWapper>
    )
}

export default MapListView
