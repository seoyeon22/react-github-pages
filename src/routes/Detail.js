
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function Detail(){
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    let stars = [];
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            ).json();
            console.log(json);
        setMovie(json.data.movie);
        setLoading(false);
        getRating();    
    };
    useEffect(() => {
        getMovie();
    }, []);
    const getRating = () => {
        let rating = movie.rating;
        for(let i = 0; i < 10; i++){
            if(i < rating){
                stars.push("⭐");
            }
            else{
                stars.push(" ");
            }
        }
        return stars;
    };
    return (
        <div>
            {loading ? 
            (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1>{movie.title_long}</h1>
                    <img src={movie.medium_cover_image} />
                    <h5>
                        {getRating()} | {movie.runtime}min | {movie.language}
                    </h5>
                    <h5>
                        {movie.genres.map(g => (
                            <span key={g}>#{g}&ensp;</span>
                        ))}
                    </h5>
                    {movie.description_full}
                </div>
            )}
        </div>
    );
}

export default Detail;