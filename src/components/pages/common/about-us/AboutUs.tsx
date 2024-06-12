import React from 'react';
import { Box, Heading, Container, Text, VStack, Divider, List, ListItem, UnorderedList } from '@chakra-ui/react';

const AboutUs = () => {
    return (
        <Box py={10}>
            <Container maxW={'7xl'}>
                <Box p={4}>
                    <Heading as="h2" size="xl" mb={6}>
                        About Us
                    </Heading>
                    <VStack spacing={8} justifyContent={'initial'} gap={0} alignItems={'initial'}>
                        <Heading as="h5" size="md" mb={6}>
                            Welcome to Monroo– Your Bridge to Exceptional Talent.
                        </Heading>
                        <Text fontSize="lg">
                            At Monroo, we believe in the power of connection. Our platform is designed to bring together talented freelancers from diverse creative fields with the employers who need
                            their unique skills and expertise. Whether you're an actor looking for your next big break, a model seeking exciting opportunities, an artist eager to showcase your work,
                            or a marketer ready to make an impact, Monroo is your go-to resource for finding the perfect match.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            Our mission
                        </Heading>
                        <Text fontSize="lg">
                            Our mission is simple: to empower creative professionals by providing them with a robust platform where they can find meaningful and rewarding opportunities. We aim to
                            bridge the gap between talent and opportunity, making it easier for freelancers to thrive in their careers and for employers to find the perfect fit for their projects.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            Who We Are
                        </Heading>
                        <Text fontSize="lg">
                            Monroo was founded by two friends who saw the need for a dedicated space where creative professionals could connect with employers in a seamless and efficient manner. Our
                            team comprises experienced professionals from the fields of entertainment, marketing, and technology, all committed to fostering a vibrant community of creatives and
                            employers.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            What We Offer
                        </Heading>
                        <Text fontSize="lg">
                            <UnorderedList spacing={3}>
                                <ListItem>
                                    <strong>Diverse Talent Pool:</strong> From seasoned professionals to emerging talents, our platform hosts a wide range of freelancers ready to bring their unique
                                    skills to your projects.
                                </ListItem>
                                <ListItem>
                                    <strong>User-Friendly Interface:</strong> Our easy-to-navigate platform makes it simple for freelancers to showcase their portfolios and for employers to find the
                                    talent they need.
                                </ListItem>
                                <ListItem>
                                    <strong>Secure Transactions:</strong> We prioritize your security, ensuring all transactions and communications on our platform are safe and confidential.
                                </ListItem>
                                <ListItem>
                                    <strong>Supportive Community:</strong> We are more than just a job board; we are a community. Our platform offers resources, networking opportunities, and support
                                    to help you succeed in your career.
                                </ListItem>
                            </UnorderedList>
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            For Freelancers
                        </Heading>
                        <Text fontSize="lg">
                            Join Monroo to gain access to a wealth of opportunities tailored to your skills and ambitions. Create a profile, showcase your portfolio, and connect with employers who
                            value your talent. We are here to help you grow your career and achieve your dreams.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            For Employers
                        </Heading>
                        <Text fontSize="lg">
                            Finding the right talent for your project has never been easier. Browse through our diverse pool of freelancers, review their portfolios, and hire with confidence. Whether
                            you need actors for a film, models for a photoshoot, artists for a creative project, or marketers to boost your brand, Monroo has got you covered.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            Our Vision
                        </Heading>
                        <Text fontSize="lg">
                            We envision a world where creative professionals and employers connect effortlessly, fostering collaborations that lead to outstanding projects and fulfilling careers. We
                            are dedicated to continuously improving our platform, ensuring it remains a leading resource for creative talents and employers alike.
                        </Text>
                        <Divider />
                        <Heading as="h5" size="md" mb={6} mt={6}>
                            Join Us
                        </Heading>
                        <Text fontSize="lg">
                            Become a part of the Monroo community today. Together, let's create, innovate, and bring extraordinary projects to life. <br /> Welcome to Monroo – Your Bridge to
                            Exceptional Talent.
                        </Text>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutUs;
