import React,{useState,useEffect} from 'react';
import axios from 'axios';
import saveAs from 'file-saver';

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

    const handleDownload = (movieId: string, title: string) => {
        axios
          .get(`http://localhost:6700/download/${movieId}`, { responseType: 'blob' })
          .then((response) => {
            const blob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(blob, `${title}.pdf`);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      

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
                                <button onClick={() => handleDownload(movie._id, movie.title)}>Download Document</button>
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