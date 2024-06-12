import React from 'react';
import { Box, Heading, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Text } from '@chakra-ui/react';

const FAQs = () => {
    return (
        <Box py={10}>
            <Container maxW={'7xl'}>
                <Heading as="h2" size="xl" mb={6} textAlign="center">
                    Frequently Asked Questions
                </Heading>
                <Accordion allowToggle>
                    {/* General Questions */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    What is Monroo?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Monroo is a platform that connects talented freelancers with employers seeking skills in acting, modeling, artistry, and marketing. We provide a seamless way for creative
                            professionals to find opportunities and for employers to hire top talent.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How does Monroo work?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Monroo allows freelancers to create profiles, set their hourly rates, and showcase their expertise. Employers can post job listings or search for freelancers directly. Once
                            a match is found, both parties can communicate, negotiate terms, and manage projects through our platform.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* For Freelancers */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I sign up as a freelancer?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Click on the "Sign Up" button on the homepage, choose the "Freelancer" option, and fill out the registration form. Once registered, you can create your profile, set your
                            hourly rate, and start browsing job opportunities.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I set my hourly rate?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            You can set your hourly rate during the profile creation process. You can update it anytime by going to your profile settings. Be sure to set a competitive yet realistic
                            rate based on your skills and experience.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I apply for jobs?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Browse through the job listings that match your expertise. When you find a job you're interested in, click "Apply," write a personalized proposal, and submit your
                            application. Employers will review your application and contact you if they are interested.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Can employers contact me directly?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Yes, employers can browse freelancer profiles and contact you directly through the platform. Ensure your profile is complete and up-to-date to attract more direct
                            inquiries.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* For Employers */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I post a job?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Click on the "Post a Job" button on the homepage, fill out the job details, including the required skills, project requirements, deadlines, and budget. Once posted,
                            freelancers will be able to apply for your job.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I find freelancers?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Use the search bar and filters to browse freelancer profiles by skill, expertise, and rate. Review their portfolios and contact those who fit your project needs directly
                            through their profiles.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I hire a freelancer?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Once you find a freelancer you want to hire, you can negotiate terms and finalize the agreement through our platform. All communications and payments should be managed
                            securely through Monroo.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How are payments handled?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Payments are processed securely through our platform. Employers can make payments directly to freelancers once the work is completed to their satisfaction. Monroo ensures
                            all transactions are safe and confidential.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Security and Support */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Is my personal information secure?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>Yes, we prioritize your privacy and security. All personal information and communications are encrypted and securely stored.</AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    What if I have a problem or need support?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            If you encounter any issues or need assistance, please contact our support team at [support@monroo.com] or visit our Help Center for more resources.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Are there any fees for using Monroo?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Creating a profile and browsing jobs or freelancers is free. However, Monroo may charge a service fee on successful transactions. Please refer to our Pricing page for
                            detailed information on our fee structure.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Can I update my profile information?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Yes, you can update your profile information at any time by going to your account settings. Keeping your profile up-to-date helps attract more opportunities or suitable
                            freelancers.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Payment Collection and Timing */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How and when will I get paid as a freelancer?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Payments are collected through Monroo's secure payment system. Here’s how it works:
                            <ol>
                                <li>Project Agreement: Once you and the employer agree on the project terms, the employer deposits the agreed amount into an escrow account managed by Monroo.</li>
                                <li>Project Completion: Complete the project according to the agreed-upon terms and submit your work to the employer for review.</li>
                                <li>Employer Approval: The employer reviews your work. If they are satisfied, they approve the payment release.</li>
                                <li>Payment Release: Once the employer approves the work, the payment is released from escrow to your Monroo account.</li>
                                <li>Withdrawal: You can withdraw your earnings to your bank account or preferred payment method. Withdrawal times may vary depending on the payment method chosen.</li>
                            </ol>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    What if there's a dispute about payment?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            If there is a dispute, Monroo provides a resolution service. Both parties can submit their case, and our team will mediate to reach a fair resolution.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* For Employers */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    How do I make payments to freelancers?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Payments are handled securely through Monroo's platform. Here’s the process:
                            <ol>
                                <li>
                                    Deposit Funds: Once you hire a freelancer, you will deposit the agreed-upon amount into an escrow account managed by Monroo. This ensures that funds are available
                                    when the project is completed.
                                </li>
                                <li>
                                    Project Milestones: For larger projects, you can set up milestone payments. Funds for each milestone will be held in escrow and released upon approval of each
                                    completed milestone.
                                </li>
                                <li>Approve Work: When the freelancer submits their work, review it carefully. If you’re satisfied with the work, approve the payment release.</li>
                                <li>Release Payment: After your approval, the funds will be released from escrow to the freelancer’s Monroo account.</li>
                            </ol>
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    What if I'm not satisfied with the freelancer's work?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            If you are not satisfied with the work submitted, you can request revisions. If the issue cannot be resolved, you can initiate a dispute through Monroo's resolution
                            service. Our team will review the case and help mediate a fair outcome.
                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Are there any fees for making payments?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Monroo may charge a service fee for processing payments. This fee helps us maintain a secure and efficient platform. Detailed information about fees can be found on our
                            Pricing page.
                        </AccordionPanel>
                    </AccordionItem>

                    {/* Payment Security */}
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" fontWeight={'bold'} textAlign="left">
                                    Is the payment process secure?
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Yes, Monroo uses advanced encryption and secure payment gateways to ensure all transactions are safe and confidential. Your financial information is protected, and all
                            transactions are monitored for security.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <Text mt={10}>
                    For more detailed information or assistance with payments, please visit our Help Center or contact our support team at [support@monroo.com]. We're here to help ensure a smooth and
                    secure payment process for all users.
                </Text>
            </Container>
        </Box>
    );
};

export default FAQs;
