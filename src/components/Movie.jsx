import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Button, Modal, Alert } from 'react-bootstrap'; // Import Modal from react-bootstrap
import { deleteMovie } from '../services/api';
import { addToWishlist } from '../redux/slices/wishlistSlice'; 
import { useDispatch, useSelector } from 'react-redux';

export const Movie = ({ movie }) => {
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [ratings, setRatings] = useState(movie.ratings || []); // State to hold ratings
    const [userRating, setUserRating] = useState(''); // State to hold user-entered rating
    const [error, setError] = useState(''); // State to hold error message
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist);

    const handleDelete = async () => {
        await deleteMovie(movie.id);
        setShowModal(false); // Close the modal after deletion
        // Redirect to /list
        window.location.href = "/list";
    };
    const handleAddToWishlist = () => {
        dispatch(addToWishlist(movie));
      };
    const handleRate = () => {
        const rating = parseInt(userRating);
        if (rating >= 1 && rating <= 5) {
            setRatings([...ratings, rating]);
            setUserRating('');
            setError('');
        } else {
            setError('Please enter a rating between 1 and 5');
        }
    };

    const calculateAverageRating = () => {
        if (ratings.length === 0) {
            return "No ratings yet";
        }
        const sum = ratings.reduce((total, rating) => total + rating, 0);
        const average = sum / ratings.length;
        return `Average rating: ${average.toFixed(1)}`;
    };

    return (
        <Card style={{ width: '20rem' }} className="m-3">
            <Card.Img variant="top" src={`/images/${movie.img}`} />
            <Card.Body>
                <Card.Title>
                    <Link to={`/${movie.id}`}>{movie.title}</Link>
                </Card.Title>
                <Card.Text>
                    <b>Year:</b> {movie.year}<br />
                    <b>Genre:</b> {movie.genre}<br />
                    <b>Description:</b> {movie.description}<br />
                    <b>Ratings:</b> {calculateAverageRating()}<br />
                    {error && <Alert variant="danger">{error}</Alert>}
                </Card.Text>
                <Button variant="primary" onClick={handleAddToWishlist}>Add to wishlist</Button>
                {wishlist.message && <Alert variant="success">{wishlist.message}</Alert>}
                <input
                    type="number"
                    value={userRating}
                    onChange={(e) => setUserRating(e.target.value)}
                />
                <Button
                    variant="primary"
                    className="mx-2"
                    onClick={handleRate}
                >
                    Rate
                </Button>
                <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => setShowModal(true)} 
                >
                    Delete
                </Button>
            </Card.Body>
            {/* Confirmation modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this movie?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};
