import { useState } from 'react';
import { Box, Heading, Flex, Container, Button, FormControl, FormLabel, Input, Textarea, VStack, useToast } from '@chakra-ui/react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const toast = useToast();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission logic here
        // Example: Send formData to an API
        console.log(formData);

        toast({
            title: 'Message sent.',
            description: "We've received your message and will get back to you shortly.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        // Reset the form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    return (
        <Box bg="primary.50" py={10}>
            <Container maxW={'7xl'}>
                <Heading as="h2" size="lg" mb={6} textAlign="center">
                    Contact Us
                </Heading>
                <Flex justify="center">
                    <Box bg="white" p={6} borderRadius="md" shadow="md" w="full" maxW="lg">
                        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" value={formData.name} onChange={handleChange} placeholder="Your name" />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" value={formData.email} onChange={handleChange} placeholder="Your email" />
                            </FormControl>
                            <FormControl id="subject" isRequired>
                                <FormLabel>Subject</FormLabel>
                                <Input type="text" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                            </FormControl>
                            <FormControl id="message" isRequired>
                                <FormLabel>Message</FormLabel>
                                <Textarea value={formData.message} onChange={handleChange} placeholder="Your message" rows={6} />
                            </FormControl>
                            <Button colorScheme="primary" type="submit" w="full">
                                Send Message
                            </Button>
                        </VStack>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default ContactUs;
