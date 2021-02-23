import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Container=styled.div`
    height: 420px;
    width: 100%;
`;
const Poster=styled.div`
    background-image: url(${props=>props.bg});
    height: 100%;
    width: 100%;
    background-size: cover;
    background-position: center center;
`;

export default ({id, medium_cover_image})=> (
    <Container>
        {/* {console.log(id, medium_cover_image)} */}
        <Link to={`/${id}`}>
            <Poster bg={medium_cover_image}/>
        </Link>
    </Container>
);