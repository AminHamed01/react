import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { editMovie, getMovieById } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMovie = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [movie, setMovie] = useState({
        title: "",
        year: 0,
        img: "",
        genre: "",
        description: "",
    });

    const handleCancel = () => {
        navigate("/list");
    };

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await getMovieById(id);
                setMovie(response.data);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            }
        };
        fetchMovieData();
    }, [id]);

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const movieResult = await editMovie(id, movie);
        if (movieResult.status === 200) {
            navigate("/list");
        }
    };

    return (
        <Container className="mt-3">
        <Form method="POST">
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={movie.title}
                    onChange={(e) => handleChange(e)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Year"
                    name="year"
                    value={movie.year}
                    onChange={(e) => handleChange(e)}
                />
            </Form.Group>

                <Form.Group className="mb-3" controlId="formgenre">
                    <Form.Label>genre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="genre"
                        name="genre"
                        value={movie.genre}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="Image"
                        name="img"
                        onChange={(e) => handleFileInput(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={movie.description}
                        name="description"
                        
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>


                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleClick(e)}
                >
                    Update Movie
                </Button>
                <Button variant="outline-dark" onClick={handleCancel}>
                    Cancel
                  
               
     
                </Button>
            </Form>
        </Container>
    );
};
