import { Box, Heading, Flex, Grid, Container, Button, Text, Image, Icon } from '@chakra-ui/react';
import { FaRegEnvelope, FaRegUser, FaRegAddressCard, FaRegCreditCard, FaChevronRight } from 'react-icons/fa'; // Import icons from react-icons library
import { useNavigate } from 'react-router-dom';

const stepsData1 = [
    {
        title: 'Create Your Profile',
        desc: [
            'Sign up and create a compelling profile that showcases your skills, experience, and portfolio.',
            'Include a professional photo, a brief bio, and any relevant work samples to make your profile stand out.',
        ],
        icon: FaRegEnvelope,
    },
    {
        title: 'Set Your Rate',
        desc: ['Define your rate per hour based on your expertise and industry standards.', 'Be competitive yet realistic to attract the right opportunities.'],
        icon: FaRegUser,
    },
    {
        title: 'Select Your Field of Expertise',
        desc: [
            'Choose the categories that best represent your skills, whether it is acting, modeling, artistry, or marketing.',
            'This helps employers find you easily when they are searching for specific talents.',
        ],
        icon: FaRegAddressCard,
    },
    {
        title: 'Discover Opportunities',
        desc: ['Browse through job listings posted by employers that match your expertise', 'Apply to the jobs that interest you with a personalized proposal.'],
        icon: FaRegCreditCard,
    },
    {
        title: 'Get Contacted Directly',
        desc: ['Employers can also find and contact you directly through your profile.', 'Negotiate terms and accept job offers that align with your career goals.'],
        icon: FaRegCreditCard,
    },
    {
        title: 'Payments',
        desc: ['With Monroo, your payment is guaranteed after the work is completed'],
        icon: FaRegCreditCard,
    },
];
const stepsData2 = [
    {
        title: 'Post a Job',
        desc: ['Create a detailed job listing specifying the skills and expertise you need.', 'Include project requirements, deadlines, and your budget to attract suitable candidates.'],
        icon: FaRegEnvelope,
    },
    {
        title: 'Browse Talents',
        desc: ['Use our advanced search filters to find freelancers that match your project needs.', 'Review profiles, portfolios, and hourly rates to select the best fit.'],
        icon: FaRegUser,
    },
    {
        title: 'Direct Contact',
        desc: ['Reach out to freelancers directly through their profiles to discuss your project.', 'Negotiate terms and finalize the agreement with your chosen talent.'],

        icon: FaRegAddressCard,
    },
    {
        title: 'Hire with Confidence',
        desc: ['Once you’ve selected a freelancer, hire them through the Monroo platform.', 'Manage all communications and transactions securely within our system.'],
        icon: FaRegCreditCard,
    },
    {
        title: 'Complete Your Project',
        desc: ['Collaborate with your freelancer to complete the project.', 'After you are satisfied with the work, pay through Monroo.'],
        icon: FaRegCreditCard,
    },
];

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <Box bg="primary.50">
            <Container maxW={'7xl'}>
                <Box p="4">
                    <Flex p={4} bg="white">
                        <Box flex="1" p="12" pb={0}>
                            <Text lineHeight={1} maxWidth={600} fontWeight="700" fontSize="7xl" mb="4">
                                How It Works?
                            </Text>
                            <Box textTransform={'uppercase'} fontSize={'sm'} color={'gray.500'} fontWeight={600} letterSpacing={2} mb={8}>
                                <p>Welcome to Monroo – Your Pathway to Exceptional Talent and Opportunities</p>
                            </Box>
                            <Box fontWeight={300} fontSize={'sm'}>
                                <p>
                                    Monroo simplifies the process of connecting talented freelancers with employers who need their skills. Whether you're a creative professional seeking your next gig
                                    or an employer looking for the perfect talent, Monroo is designed to make the process seamless and efficient.
                                </p>
                            </Box>
                        </Box>

                        <Box h="500px" overflow="hidden">
                            <Image src={'/assets/images/howitworks.jpg'} alt={'photo'} objectFit="cover" w="100%" h="100%" />
                        </Box>
                    </Flex>

                    <Box textAlign={'center'} mt="20">
                        <Grid mb={6} templateColumns="repeat(3, 1fr)" gap={6}>
                            {stepsData1.map((step, index) => (
                                <Box key={index} textAlign="left" p={4}>
                                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}></Box>
                                    <Heading as="h3" size="md" mb={2}>
                                        {step.title}
                                    </Heading>
                                    <Box>
                                        {step.desc.map((item, i) => {
                                            return <li key={i}>{item}</li>;
                                        })}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                        <Button onClick={() => navigate('/register')} colorScheme={'primary'}>
                            Register as Star
                        </Button>
                    </Box>
                    <Box textAlign={'center'} mt="20">
                        <Grid mb={6} templateColumns="repeat(3, 1fr)" gap={6}>
                            {stepsData2.map((step, index) => (
                                <Box key={index} textAlign="left" p={4}>
                                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}></Box>
                                    <Heading as="h3" size="md" mb={2}>
                                        {step.title}
                                    </Heading>
                                    <Box>
                                        {step.desc.map((item, i) => {
                                            return <li key={i}>{item}</li>;
                                        })}
                                    </Box>
                                </Box>
                            ))}
                        </Grid>
                        <Button onClick={() => navigate('/register')} colorScheme={'primary'}>
                            Register as Scout
                        </Button>
                    </Box>

                    {/* Why Choose Monroo Section */}
                    <Box textAlign={'center'} mt="20">
                        <Box p={4}>
                            <Heading as="h2" size="xl" mb={4}>
                                Why Choose Monroo?
                            </Heading>
                            <Grid mb={6} templateColumns="repeat(2, 1fr)" gap={6} textAlign="left">
                                <Box>
                                    <Heading as="h4" size="md" mb={2}>
                                        Seamless Connection
                                    </Heading>
                                    <Text>Our platform makes it easy for freelancers and employers to find each other, ensuring a perfect match for every project.</Text>
                                </Box>
                                <Box>
                                    <Heading as="h4" size="md" mb={2}>
                                        Transparent Rates
                                    </Heading>
                                    <Text>Freelancers set their rates upfront, so employers know what to expect, and negotiations are straightforward.</Text>
                                </Box>
                                <Box>
                                    <Heading as="h4" size="md" mb={2}>
                                        Diverse Talent Pool
                                    </Heading>
                                    <Text>Access a wide range of skilled professionals from various creative fields.</Text>
                                </Box>
                                <Box>
                                    <Heading as="h4" size="md" mb={2}>
                                        Secure Transactions
                                    </Heading>
                                    <Text>All payments and communications are handled securely, giving you peace of mind.</Text>
                                </Box>
                            </Grid>
                            <Heading as="h2" size="xl" mb={4}>
                                Join Monroo Today
                            </Heading>
                            <Text mb={4}>
                                Start your journey with Monroo and experience a streamlined process for finding and hiring top talent. Whether you're looking to showcase your skills or find the right
                                person for your project, Monroo is here to help you succeed.
                            </Text>
                            <Button onClick={() => navigate('/register')} colorScheme={'primary'}>
                                Sign up now and become part of the Monroo community!
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default HowItWorks;
