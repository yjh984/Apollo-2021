import React from 'react';
import {gql} from 'apollo-boost';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const GET_MOVIE=gql`
    query getMovie($id:Int!){
        movie(id:$id){
            title
            medium_cover_image
            language
            rating
            description_intro
        }
        suggestions(id:$id){
            id
            medium_cover_image
        }
    }
`;

const Container=styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg,#d754ab,#fd723a);
    width: 100%;
    display:flex;
    justify-content: space-around;
    align-items:center;
    color:white;
`;

const Column=styled.div`
    margin-left:50px;
`;
const Title=styled.h1`
    font-size: 25px;
    margin-bottom:15px;
`;
const Subtitle=styled.h4`
    font-size: 20px;
    margin-bottom:10px;
`;
const Description=styled.p`
    font-size: 13px;
    width: 350px;
`;

const Suggest=styled.div`
    font-size: 9px;
    width: 350px;
`;

const Poster=styled.div`
    // width: 220%;
    // height: 65%;
    width: 25%;
    height: 80%;
    background-color: transparent;
    background-image: url(${props=>props.bg});
    background-size: cover;
    background-position:center center;
    margin-right:20%;
    border-radius: 7px;
`;

export default()=>{
    const {id} = useParams(); //useParams로 받는 변수는 모두 String임..
    const {loading, data} = useQuery(GET_MOVIE,{
        variables:{id:Number(id)}
    });
    return (
        <Container>
            <Column>
                <Title>{loading? "Loading":data.movie.title}</Title>
                {/* 반드시 loading후 data를 사용할 것 */}
                {/* {!loading && data.movie && (
                    <> */}
                    <Subtitle>{data?.movie?.language}{loading?"":"/"}{data?.movie?.rating}</Subtitle>
                    <Description>{data?.movie?.description_intro}</Description>
                    {/* </>
                )} */}
                {<div>----- </div>}
                {data?.suggestions?.map(s=><Suggest>
                {s.id}:{s.medium_cover_image}
                </Suggest>)}
            </Column>
            {!loading && 
             <Poster bg={data?.movie?.medium_cover_image}></Poster>}
             {/* <Poster bg={data&&data.movie? data.movie.medium_cover_image:""}/> */}
        </Container>
    )
}




    // console.log(loading, data);
//     if(loading){
//         return "Loading...";
//     }
//     if(data&&data.movie){
//         return data.movie.title;
//     }
// }