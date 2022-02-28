import { Checkbox, CheckboxProps, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MapDrawer from "./mapDrawer";

const SkyBuleCheckbox = withStyles({
    root: {
      color: '#7E96B8',
      '&$checked': {
        color: '#12DCF6',
      },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const MapViewWarpper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const SelectGroup = styled.div`
    display: flex;
    margin-left: 20px;
    div{
        display: flex;
        align-items: center;
        margin-right: 24px;
        margin-bottom: 24px;
        i{
            margin-left: 6px;
            font-size: 14px;
            color: #7E96B8;
            &.active{
                color: #12DCF6;
            }
        }
    }
`;

const Map = styled.div`
    flex: 1;
    background: url('images/map.jpg') no-repeat;
    background-size: 100%,100%;
`;
const PriceMap = styled.div`
    flex: 1;
    background: url('images/map/priceMap.jpg') no-repeat;
    background-size: 100%,100%;
`;
const HeatMap = styled.div`
    flex: 1;
    background: url('images/map/heatMap.jpg') no-repeat;
    background-size: 100%,100%;
`;

const BgMap = styled.div`
    flex: 1;
    position: relative;
    img{
        position: absolute;
        width: 100%;
    }
`;
const MapClick = styled.div`
    display: flex;
    position: relative;
    flex: 1;
`;
const Mantle = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;
interface Iprops{
    strList: string[]
}

const MapView = (props:Iprops) => {
    const [priceOnMap, setPriceOnMap] = useState(false);
    const [heatMap, setHeatMap] = useState(false);
    const [showDrawer,setShowDrawer] = useState(false);
    const { strList } = props;
    useEffect(()=>{
        if (strList.length > 0 ) {
            setPriceOnMap(false);
            setHeatMap(false);
        }
    },[strList])

    return (
        <MapViewWarpper>
            <SelectGroup>
                <div>
                    <SkyBuleCheckbox checked={priceOnMap} onChange={(e)=>{
                        setPriceOnMap(e.target.checked)
                        setHeatMap(false)
                    }}/>
                    <i className={priceOnMap ? 'active' : ''}>Price on map</i>
                </div>
                <div>
                    <SkyBuleCheckbox checked={heatMap} onChange={(e)=>{
                        setHeatMap(e.target.checked)
                        setPriceOnMap(false)
                    }}/>
                    <i className={heatMap ? 'active' : ''}>Heat map</i>
                </div>
            </SelectGroup>
            <MapClick
                onClick={()=>{
                    setShowDrawer(!showDrawer)
                }}
            >
                {strList.length == 0 && !(priceOnMap || heatMap) && <Map></Map>}
                {
                    strList.length != 0 && !(priceOnMap || heatMap) && <BgMap>
                        <img key={'bgMap'} src={`images/map/map-bg.jpg`} alt="" />
                        {
                            strList.map(item => {
                                return <img key={item} src={`images/map/${item}.png`} alt="" />
                            })
                        }

                    </BgMap>
                }
                {priceOnMap && <PriceMap></PriceMap>}
                {heatMap && <HeatMap></HeatMap>}
                {showDrawer && (
                    <Mantle>
                        <img src="images/coordinate.svg" alt=""/>
                    </Mantle>
                )}
                {
                    showDrawer && <MapDrawer close={()=>{
                        setShowDrawer(false);
                    }}></MapDrawer>
                }
            </MapClick>
        </MapViewWarpper>
    )
}

export default MapView
