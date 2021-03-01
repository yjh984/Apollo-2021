import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from './Movie';
import {Link} from 'react-router-dom';



const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`;

const Headers=styled.header`
    background-image: linear-gradient(-45deg,#d754ab,#fd723a);
    padding-bottom: 40px;
    height: 30vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%
`;

const Title = styled.h1`
    font-size: 50px;
    font-weight: 400;
    margin-bottom: 20px;
    display: flex;
`;


const Subtitle=styled.h3`
    font-size: 15px;
`;

const Loading=styled.div`
    font-size: 18px;
    opcity: 0.5;
    font-weight: 500;
    margin-top: 10px;
    align-items: center;
`;

const Movies=styled.div`
    // margin-left:300px;
    // margin-right:300px;
    // width: 50vh;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap:25px;
    // padding-left: 50px;
    // padding-right:50%;
    width: 60%;
    // height: 10%;
    position: relative;
    top: -50px;
    align-items: center;
    // border-radius: 7px;
`;

const Button=styled.div`
    display: flex;
    align-items:left;
    /* border: none; */
    /* border-radius: 50%; */
    color: blue;
    /* padding: 15px 32px; */
    text-align: cneter;
    text-decoration: none;
    font-size: 1px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    margin-left : 20px;
    margin-right:85%;
    position: sticky;
    top: 100px;
`;

const Button0={
    // background-color: blue;
    fontSize: "20px",
    border:"None"
};

const Button1={
    borderRadius: "5px",
    fontSize: "20px"
    // align:"left"
};

let paramYear=2021;

const handlePreYear=()=>{
    paramYear-=1;
}

const handlePostYear=()=>{
    paramYear+=1;
}

export default ({})=>{
    // console.log(paramYear);
    let tail=`
        movies(limit:40,rating:7,year:${paramYear}){
            id
            title
            year
            rating
            medium_cover_image
            isLiked @client
        }`;
    // console.log(tail);
    let GET_MOVIES=gql`{${tail}}`;

    const {loading, error, data} = useQuery(GET_MOVIES);
    // console.log(loading, error, data);
   
    return (
        <Container>
            <Headers>
                <Title>Apollo App-2021</Title>
                <Subtitle>Movies are high rating in {paramYear}</Subtitle>
                {loading && <Loading>Loading...</Loading>}
            </Headers>
            <Button>
                <button style={Button0}>{paramYear}</button>
                <div></div>
            <Link to={'/'}>
                <button style={Button1} onClick={handlePostYear}>+</button>
                <button style={Button1} onClick={handlePreYear}>-</button>
            </Link>
            </Button>
            <Movies>                
            {data?.movies?.map(m=>(
                <Movie key={m.id} id={m.id}
                isLiked={m.isLiked}
                bg={m.medium_cover_image}/>))}
            </Movies>
        </Container>
    );
}

/*
export default()=>{
    const {loading, error, data} = useQuery(GET_MOVIES);
    if(loading){
        return "loading...";
    }
    if(data&&data.movies){
        return (
            data.movies.map(m=><Movie key={m.id}>{m.id}</Movie>);
        );
    }
    // return <h1>Home</h1>;
};
*/