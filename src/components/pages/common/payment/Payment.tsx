import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";

type ValidationErrors = {
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors: ValidationErrors = {};

    // Card Number validation
    if (!cardNumber.trim().match(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)) {
      validationErrors.cardNumber = "Please enter a valid card number";
    }

    // Expiry Date validation
    if (!expiry.trim().match(/^\d{2}\/\d{2}$/)) {
      validationErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    }

    // CVC validation
    if (!cvc.trim().match(/^\d{3}$/)) {
      validationErrors.cvc = "Please enter a valid CVC (3 digits)";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Proceed with payment processing logic
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "") // Remove non-numeric characters
        .replace(/(^\d{2})\/?(\d{0,2})/, "$1/$2"); // Format as MM/YY
      setExpiry(formattedValue);
    } else if (name === "cardNumber") {
      const formattedCardNumber = value
        .replace(/\D/g, "") // Remove non-numeric characters
        .replace(/(.{4})/g, "$1 "); // Add space after every four digits
      setCardNumber(formattedCardNumber);
    } else if (name === "cvc") {
      const formattedCVC = value.slice(0, 3); // Limit input to 3 characters
      setCvc(formattedCVC);
    } else {
      // Handle other input changes for different fields if needed
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired isInvalid={!!errors.cardNumber}>
            <FormLabel>Card Number</FormLabel>
            <Input
              name="cardNumber"
              type="text"
              value={cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
            />
            <FormErrorMessage>{errors.cardNumber}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.expiry}>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="text"
              name="expiry"
              value={expiry}
              onChange={handleChange}
              maxLength={5}
              placeholder="MM/YY"
            />
            <FormErrorMessage>{errors.expiry}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.cvc}>
            <FormLabel>CVC</FormLabel>
            <Input
              type="tel"
              name="cvc"
              value={cvc}
              onChange={handleChange}
              maxLength={3}
              placeholder="123"
            />
            <FormErrorMessage>{errors.cvc}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" w="100%">
            Pay Now
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Payment;
