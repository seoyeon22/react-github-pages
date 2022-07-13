
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
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
        for(let i = 0; i < rating; i++){
            stars.push("⭐");
        }
        return stars;
    };
    return (
        <div>
            {loading ? 
            (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movie}>
                    <div className={styles.movie__info}>
                        <h1 className={styles.movie__title}>{movie.title_long}</h1>
                        <img src={movie.medium_cover_image} className={styles.movie__img}/>
                        <ul className={styles.movie__detail}>
                            <li>{movie.runtime}min</li>
                            <li>❤️{movie.like_count}</li>
                            <li>{getRating()}</li>
                        </ul>
                        <ul className={styles.movie__genres}>
                            {movie.genres.map(g => (
                                <li key={g}>#{g}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.movie__description}>
                        {movie.description_full}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;