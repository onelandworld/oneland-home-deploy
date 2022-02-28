import styled from "styled-components"


const SandBoxInfoWapper = styled.div`
    flex: 1;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    img{
        width: 130px;
        height: 130px;
        margin-top: 24px;
    }
`;

const Title = styled.div`
    color: #FFFFFF;
    font-size: 18px;
    line-height: 150%;
    font-weight: 600;
`;

const Subtitle = styled.div`
    color: #7E96B8;
    font-size: 14px;
    font-weight: 600;
    margin-top: 24px;
    line-height: 150%;
    max-width: 256px;
`;

export const SandBoxInfo: React.FC = () => {
    return (
        <SandBoxInfoWapper>
            <Title>About the Sandbox</Title>
            <img src="images/sandBox-lg.svg" alt="" />
            <Subtitle>site: https://sandbox.game</Subtitle>
            <Subtitle>Sandbox is a decentralized community owned virtual world. Creators can host custom games and events on the virtual world. </Subtitle>
        </SandBoxInfoWapper>
    );
}
