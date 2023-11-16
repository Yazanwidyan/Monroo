import {
  Box,
  Text,
  Flex,
  IconButton,
  Stack,
  Divider,
  Image,
} from "@chakra-ui/react";
import { FaHeart, FaComment, FaSave } from "react-icons/fa";

const EventTimelineCard = ({
  image,
  title,
  name,
  description,
  onPoke,
  onMessage,
  onSave,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="base">
      <Image src={image} alt={name} mb={4} width="200px" height="auto" />

      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {name}
      </Text>
      <Text>{description}</Text>
      <Divider my={3} />
      <Flex justify="space-between">
        <Stack direction="row" spacing={4}>
          <IconButton
            aria-label="Poke"
            icon={<FaHeart />}
            onClick={onPoke}
            variant="outline"
          />
          <IconButton
            aria-label="Message"
            icon={<FaComment />}
            onClick={onMessage}
            variant="outline"
          />
          <IconButton
            aria-label="Save"
            icon={<FaSave />}
            onClick={onSave}
            variant="outline"
          />
        </Stack>
        {/* You can add additional components here */}
      </Flex>
    </Box>
  );
};

export default EventTimelineCard;
