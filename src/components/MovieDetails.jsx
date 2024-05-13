import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../services/api"; // Import getMovieById function
import { useEffect, useState } from "react";

export const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await getMovieById(id);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col md={4}>
                    <Card.Img
                        variant="top"
                        src={`/images/${movie.img}`}
                        alt="Product Img"
                        height="300"
                    />
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={12}>
                            <h1>{movie.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h5>year</h5>
                        </Col>
                        <Col>
                            <p style={{ marginLeft: "50px" }}>
                                {movie.year}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h5>genre</h5>
                        </Col>
                        <Col>
                            <p style={{ marginLeft: "50px" }}>
                                {movie.genre} 
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h5>description</h5>
                        </Col>
                        <Col>
                            <p style={{ marginLeft: "50px" }}>
                                {movie.description} 
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
export default MovieDetails;