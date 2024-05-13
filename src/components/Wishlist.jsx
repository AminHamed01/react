// Wishlist.js
import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { clearWishlist } from '../redux/slices/wishlistSlice';

const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.movies);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (movieId) => {
        dispatch(removeFromWishlist(movieId));
    };
    const handleClearWishlist = () => {
        dispatch(clearWishlist());
    };
    return (
        <div>
            <h1>Wishlist</h1>
            {wishlist.length === 0 ? (
                <Alert variant="info">Your wishlist is empty.</Alert>
            ) : (
                wishlist.map((movie) => (
                    <Card key={movie.id} style={{ width: '20rem' }} className="m-3">
                        <Card.Img variant="top" src={`/images/${movie.img}`} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>
                                <b>Year:</b> {movie.year}<br />
                                <b>Genre:</b> {movie.genre}<br />
                                <b>Description:</b> {movie.description}<br />
                            </Card.Text>
                            <Button variant="danger" onClick={() => handleRemoveFromWishlist(movie.id)}>
                                Remove from Wishlist
                            </Button>
                        </Card.Body>
                        
                    </Card>

                    
                ))
            )}
              {wishlist.length > 0 && (
                <Button variant="danger" onClick={handleClearWishlist}>
                    Clear Wishlist
                </Button>
            )}
        </div>
    );
};

export default Wishlist;
