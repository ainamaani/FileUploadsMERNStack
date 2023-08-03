import React,{useState,useEffect} from 'react';
import axios from 'axios'

const List = ():JSX.Element => {
    const [movies,setMovies] = useState<any[]>([]);

    useEffect(()=>{
        const fetchAllMovies = async() =>{
            try {
                const response = await axios.get('http://localhost:6700/movies');
                if(response.status === 200){
                    setMovies(response.data)
                }
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchAllMovies();
    },[]);

    useEffect(()=>{
        console.log(movies);
    },[movies])
    return (
        <div className="movies">
            <h3>List all docs</h3>
            { movies ? (
                movies.length > 0 ? (
                    movies.map(movie =>{
                        return(
                            <div key={movie._id} className="movie"> 
                                <p>{movie.title}</p>
                                <img src={`http://localhost:6700/${movie.image}`} alt={movie.title} />
                            </div>
                        )
                    })
                ):(
                    <h4>There are no movies to display</h4>
                )
            ):(
                <h2>Loading....</h2>
            )}
        </div>
    );
}
 
export default List;