import {
  Box,
  Text,
  Badge,
  Flex,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { FaRegCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventBookingCard: React.FC<{
  title: string;
  description: string;
  cost: string;
  date: string;
  location: string;
  duration: string;
  status: string;
  onCancel?: () => void;
}> = ({
  title,
  description,
  cost,
  date,
  location,
  duration,
  status,
  onCancel,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="base">
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Text>
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {description}
      </Text>
      <Flex align="center" justify="space-between" mb={2}>
        <Text fontSize="lg">
          Cost: <span style={{ fontWeight: "bold" }}>{cost}</span>
        </Text>
        <Text fontSize="lg">
          Date: <span style={{ fontWeight: "bold" }}>{date}</span>
        </Text>
      </Flex>
      <Flex align="center" justify="space-between" mb={2}>
        <Flex align="center">
          <FaMapMarkerAlt />
          <Text ml={2} fontSize="lg">
            Location: <span style={{ fontWeight: "bold" }}>{location}</span>
          </Text>
        </Flex>
        <Flex align="center">
          <FaRegCalendarAlt />
          <Text ml={2} fontSize="lg">
            Duration: <span style={{ fontWeight: "bold" }}>{duration}</span>
          </Text>
        </Flex>
      </Flex>
      <Divider my={3} />
      <Stack direction="row" spacing={4}>
        <Badge colorScheme={status === "confirmed" ? "green" : "red"}>
          {status}
        </Badge>
        {status === "pending" && (
          <Button
            fontSize="14px"
            variant="outline"
            onClick={onCancel}
            type="button"
          >
            cancel event
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default EventBookingCard;
