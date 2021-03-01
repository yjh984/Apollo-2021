import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    resolvers: {
        Movie: {
            isLiked:()=>false
        },
        Mutation:{
            toggleLikeMovie:(_, {id,isLiked}, {cache})=>{
                // console.log(cache);
                cache.writeData({id:`Movie:${id}`,
                  data:{isLiked:!isLiked}});
                // cache.writeData({id:`Movie:${id}`,data:{isLiked:true,medium_cover_image:'dldld'}});
            }
        }
    }
});

export default client;