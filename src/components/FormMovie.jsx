import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addMovie } from "../services/api"; 
import { useNavigate } from "react-router-dom";

export const FormMovie = () => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        title: "",
        year: 0,
        img: "",
        genre: "",
        description: "",

    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileInput = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.files[0].name });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const movieResult = await addMovie(movie);
        if (movieResult.status === 201) {
            navigate("/list");
        }
    };

    return (
        <Container className="mt-3">
            <Form method="POST" encType="multipart/form-data">
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>

        
                <Form.Group className="mb-3" controlId="formYear">
                    <Form.Label>year</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="year"
                        name="year"
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formgenre">
                    <Form.Label>genre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="genre"
                        name="genre"
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
                        name="description"
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Group>


                <Button
                    variant="outline-dark"
                    type="submit"
                    className="mx-5"
                    onClick={(e) => handleClick(e)}
                >
                    Submit
                </Button>
                <Button variant="outline-dark" type="reset">
                    Cancel
                </Button>
            </Form>
        </Container>
    );
};
