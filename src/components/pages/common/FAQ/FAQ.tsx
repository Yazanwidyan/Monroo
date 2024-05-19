import { Box, Heading, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';

const FAQs = () => {
    return (
        <Box py={10}>
            <Container maxW={'7xl'}>
                <Heading as="h2" size="xl" mb={6} textAlign="center">
                    Frequently Asked Questions
                </Heading>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    What is Lorem Ipsum?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris augue. Sed sed turpis nec tortor rutrum gravida. Nulla facilisi.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    How does Lorem Ipsum work?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris augue. Sed sed turpis nec tortor rutrum gravida. Nulla facilisi.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    Why use Lorem Ipsum?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris augue. Sed sed turpis nec tortor rutrum gravida. Nulla facilisi.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
        </Box>
    );
};

export default FAQs;
