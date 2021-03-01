import { useMutation } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const TOGGLE_LIKE_MOVIE=gql`
    mutation toggleLikeMovie($id:Int!, $isLiked:Boolean!){
        toggleLikeMovie(id:$id, isLiked:$isLiked) @client
    }
`;

const Container=styled.div`
    height: 220px;
    width: 100%;
    box-shadow: 0 1px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    border-radius: 7px;
    // overflow: visible;

`;
const Poster=styled.div`
    background-image: url(${props=>props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
    // overflow:visible;
`;

const Button={
    color:"red",
    background:"white",
    borderRadius: "5px",
};
export default ({id, isLiked, bg})=> {
    const [toggleLikeMovie]=useMutation(TOGGLE_LIKE_MOVIE,
        {variables:{id: parseInt(id), isLiked}});
    return (
        <Container>
        {/* {console.log(id, medium_cover_image)} */}
        <Link to={`/${id}`}>
            <Poster bg={bg}/>
        </Link>
        <button style={Button} onClick={toggleLikeMovie}>
            {isLiked? "Unlike":"Like"}
        </button>
    </Container>
    )
};