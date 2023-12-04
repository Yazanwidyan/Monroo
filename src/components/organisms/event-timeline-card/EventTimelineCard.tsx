import {
  Box,
  Text,
  Flex,
  Divider,
  Image,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaHeart, FaBookmark, FaComment } from "react-icons/fa";

const EventTimelineCard = ({
  image,
  title,
  name,
  duration,
  posted,
  description,
  onMessage,
  onSave,
}) => {
  return (
    <Box borderWidth={1} p={4} borderRadius={8}>
      <Image
        src={
          image ||
          "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
        }
        alt={name}
        mb={4}
        borderRadius={8}
      />
      <Text fontSize="xl" fontWeight="semibold" mb={2}>
        {title}
      </Text>
      <Text color="gray.600" mb={2}>
        {description}
      </Text>
      <Divider my={2} />

      <Flex align="center" justify="space-between">
        <Text fontSize="sm" color="gray.500">
          Duration: {duration} hrs
        </Text>
        <Text fontSize="sm" color="gray.500">
          Posted: {posted}
        </Text>
      </Flex>

      <Flex mt={3} justify="space-between">
        <Button size="sm" colorScheme="primary" onClick={onMessage}>
          Message Author
        </Button>

        <Flex>
          <IconButton
            icon={<FaHeart />}
            aria-label="Save"
            variant="ghost"
            fontSize="lg"
            color="gray.500"
            onClick={onSave}
            mr={2}
          />
          <IconButton
            icon={<FaBookmark />}
            aria-label="Bookmark"
            variant="ghost"
            fontSize="lg"
            color="gray.500"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventTimelineCard;
