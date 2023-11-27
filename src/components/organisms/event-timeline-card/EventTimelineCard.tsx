import {
  Box,
  Text,
  Flex,
  Stack,
  Divider,
  Image,
  Button,
} from "@chakra-ui/react";

const EventTimelineCard = ({
  image,
  title,
  name,
  duration,
  posted,
  description,
  onPoke,
  onMessage,
  onSave,
}) => {
  return (
    <Box p={4}>
      <Image
        src={
          image
            ? image
            : "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
        }
        alt={name}
        mb={4}
        width="auto"
        height="auto"
      />
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text>{description}</Text>
      <Text>Event duration: {duration} hrs</Text>
      <Text>Posted: {posted}</Text>
      <Divider my={3} />

      <Flex justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <Button onClick={onMessage}>Message Author</Button>
          <Button onClick={onSave}>Save Post</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default EventTimelineCard;
