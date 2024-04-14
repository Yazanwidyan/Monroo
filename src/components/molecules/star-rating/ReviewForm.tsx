import { useState } from 'react';
import { Box, Text, Input, Button, Flex } from '@chakra-ui/react';
import useCustomToast from '../../../hooks/useCustomToast';
import userServices from '../../../services/userServices';

const ReviewForm = ({ providerID, closeModal, fetchReviews }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const { showToast } = useCustomToast();

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async () => {
        if (!comment.trim()) {
            showToast('Please enter your comment.', { status: 'error' });
            return;
        }
        if (rating === 0) {
            showToast('Please provide a rating.', { status: 'error' });
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));

        const payload = {
            userID: user.id,
            providerID: providerID,
            stars: rating,
            comment: comment,
        };
        try {
            const res = await userServices.addReview(payload);
            console.log(res);
        } catch (error) {
            showToast(error, { status: 'error' });
        }
        setComment('');
        setRating(0);
        closeModal();
        fetchReviews();
    };

    return (
        <Box mb={4}>
            <Text fontSize="md" fontWeight="bold" mb={2}>
                Write a Review
            </Text>
            <Input placeholder="Enter your comment" value={comment} onChange={handleCommentChange} mb={2} />
            <Flex alignItems="center" mb={2}>
                <Text mr={2}>Rating:</Text>
                {[...Array(5)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleRatingChange(index + 1)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                            color: index < rating ? '#ffc107' : '#e4e5e9',
                            border: 'none',
                            background: 'none',
                            marginRight: '5px',
                        }}
                    >
                        ★
                    </button>
                ))}
            </Flex>
            <Button width={'100%'} mt={4} fontSize={'small'} size={'sm'} colorScheme="primary" onClick={handleSubmit}>
                Submit Review
            </Button>
        </Box>
    );
};

export default ReviewForm;
