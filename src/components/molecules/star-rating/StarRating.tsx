import { Box, Icon, Flex } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Render full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Icon as={FaStar} key={i} color="yellow.400" />);
        }

        // Render half star if needed
        if (hasHalfStar) {
            stars.push(<Icon as={FaStarHalfAlt} key={stars.length} color="yellow.400" />);
        }

        // Fill remaining stars with empty stars
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<Icon as={FaStar} key={stars.length + i} color="gray.300" />);
        }

        return stars;
    };

    return (
        <Flex>
            {renderStars().map((star, index) => (
                <Box key={index}>{star}</Box>
            ))}
        </Flex>
    );
};

export default StarRating;
