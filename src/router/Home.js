import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

const GET_MOVIES=gql`
    {
        movies(limit:20,rating:8,year:2020){
            id
            title
            year
            rating
            medium_cover_image
        }
    }
`;

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`;

const Headers=styled.div`
    font-size: 20px;
    background-color: rgba(214,75,156,1);
    padding: 20px 150px 20px 150px;
    color: #adaeb9;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);

`;

const Title = styled.h1`
    font-size: 30px;
`;


const Subtitle=styled.h3`
    font-size: 35px;
`;

const Loading=styled.div`
    font-size: 18px;
    opcity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

const Movies=styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap:25px;
    width: 100%;
`;

export default()=>{
    const {loading, error, data} = useQuery(GET_MOVIES);
    console.log(loading, error, data);
    return (
        <Container>
            <Headers>
                <Title>Apollo 2021</Title>
                <Subtitle>GraphQL is good!</Subtitle>
            </Headers>
            {loading && <Loading>Loading...</Loading>}
            {!loading && 
             data.movies && 
              <Movies>
                {data.movies.map(m=>(
                  <Movie key={m.id} id={m.id}
                   medium_cover_image={m.medium_cover_image}/>))}
              </Movies>
            }
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