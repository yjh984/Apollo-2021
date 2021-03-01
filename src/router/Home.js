import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

let GET_MOVIES=gql`
    {
        movies(limit:40,rating:8,year:2020){
            id
            title
            year
            rating
            medium_cover_image
            isLiked @client
        }
    }
`;

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`;

// const Headers=styled.div`
//     font-size: 20px;
//     background-color: rgba(214,75,156,1);
//     padding: 20px 150px 20px 150px;
//     color: #adaeb9;
//     box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
//       0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);

// `;

const Headers=styled.header`
    background-image: linear-gradient(-45deg,#d754ab,#fd723a);
    padding-bottom: 40px;
    height: 45vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%
`;

const Title = styled.h1`
    font-size: 60px;
    font-weight: 600;
    margin-bottom: 20px;
    display: flex;
`;


const Subtitle=styled.h3`
    font-size: 35px;
`;

const Loading=styled.div`
    font-size: 18px;
    opcity: 0.5;
    font-weight: 500;
    margin-top: 10px;
    align-items: center;
`;
// const Movies_Box=styled.div`
//     display:flex;
//     flex-direction:row;
//     justify-content: center;
//     align-items: space-around;
//     width: 100%
// `;
const Button=styled.div`
    display: flex;
    align-items:left;
    /* border: none; */
    /* border-radius: 50%; */
    color: white;
    /* padding: 15px 32px; */
    text-align: cneter;
    text-decoration: none;
    font-size: 16px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    margin-left : 20px;
    margin-right:85%;
    position: sticky;
    top: 100px;
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

const Button1={
    borderRadius: "5px",
    align:"left"
};

const handlePreYear=()=>{
    console.log("xxxxxxxxxxxxxxxxxx");
}

export default ()=>{
    const {loading, error, data} = useQuery(GET_MOVIES);
    // console.log(loading, error, data);
   
    return (
        <Container>
            <Headers>
                <Title>Apollo 2021</Title>
                <Subtitle>GraphQL is good!</Subtitle>
                {loading && <Loading>Loading...</Loading>}
            </Headers>
            <Button>
                <button style={Button1} onClick={handlePreYear}>Year-</button>
                <button style={Button1} onClick={handlePreYear}>Year+</button>
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