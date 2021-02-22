import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import Movie from '../components/Movie';

const GET_MOVIES=gql`
    {
        movies(rating:8,year:2020){
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
`;

const Headers=styled.div`
    font-size: 20px;
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
            {!loading && data.movies && data.movies.map(m=><Movie key={m.id} id={m.id}/>)}
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