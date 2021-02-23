import React from 'react';
import {gql} from 'apollo-boost';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

const GET_MOVIE=gql`
    query getMovie($id:Int!){
        movie(id:$id){
            title
            medium_cover_image
            language
            rating
            description_intro
        }
    }
`;

export default()=>{
    const {id} = useParams(); //useParams로 받는 변수는 모두 String임..
    const {loading, data} = useQuery(GET_MOVIE,{
        variables:{id:Number(id)}
    });
    // console.log(loading, data);
    if(loading){
        return "Loading...";
    }
    if(data&&data.movie){
        return data.movie.title;
    }
}