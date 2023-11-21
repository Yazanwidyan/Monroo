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
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="base">
      <Image src={image} alt={name} mb={4} width="200px" height="auto" />
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      {/* Uncomment this section if needed */}
      {/* <Text fontSize="md" fontWeight="bold" mb={2}>
      {name}
    </Text> */}

      <Text>{description}</Text>
      <Text>Event duration: {duration} hrs</Text>
      <Text>Posted: {posted}</Text>
      <Divider my={3} />

      <Flex justifyContent="space-between">
        <Stack direction="row" spacing={4}>
          <Button onClick={onPoke}>Poke Author</Button>
          <Button onClick={onMessage}>Message Author</Button>
          <Button onClick={onSave}>Save Post</Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default EventTimelineCard;
