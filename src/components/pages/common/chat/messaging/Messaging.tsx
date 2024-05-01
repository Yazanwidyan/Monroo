import { useContext, useEffect, useRef, useState } from 'react';
import { Box, VStack, Input, Button, Text, Flex, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Divider } from '@chakra-ui/react';
import { UserContext } from '../../../../../contexts/UserContext';
import providerServices from '../../../../../services/providerServices';
import userServices from '../../../../../services/userServices';
import useCustomToast from '../../../../../hooks/useCustomToast';
import { FaCcVisa, FaMoneyBill, FaPaperPlane } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa'; // Importing handshake icon from react-icons library

import { useNavigate } from 'react-router-dom';
import paymentService from '../../../../../services/paymentServices';

const getStatusText = (status) => {
    switch (status) {
        case 0:
            return 'Pending';
        case 1:
            return 'Booked';
        case 2:
            return 'Done';
        case 3:
            return 'Purchased';
        default:
            return 'Unknown';
    }
};

const Messaging = ({ selectedRoom }) => {
    const { showToast } = useCustomToast();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [eventData, setEventData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSendAllowed, setIsSendAllowed] = useState(false);
    const [isDealModalOpen, setIsDealModalOpen] = useState(false);
    const [dealPrice, setDealPrice] = useState('');
    const [mainEvent, setMainEvent] = useState(null);

    const openModal = (message) => {
        setEventData({ senderName: selectedRoom?.senderName, message: message });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openDealModal = () => {
        setIsDealModalOpen(true);
    };

    const closeDealModal = () => {
        setIsDealModalOpen(false);
    };

    const handleSubmitDeal = async () => {
        const payload = {
            eventID: mainEvent?.eventID,
            providerID: mainEvent?.providerID,
            dealPrice: dealPrice,
        };
        try {
            const res = await userServices.makeDeal(payload);
            fetchData();
        } catch (error) {}
        setDealPrice('');
        closeDealModal();
    };

    const checkoutSim = async () => {
        const payload = {
            eventID: mainEvent?.eventID,
            amount: mainEvent?.eventObj?.dealCost ? mainEvent?.eventObj?.dealCost : mainEvent?.msg,
        };
        try {
            const res = await paymentService.checkoutSim(payload);
            showToast('payment is successful', { status: 'success' });
            approvePermissionAfterPaymentSucceed();
        } catch (error) {
            showToast('payment not successful', { status: 'error' });
            console.log(error);
        }

        // setDealPrice('');
        // closeDealModal();
    };

    const handlePriceChange = (e) => {
        setDealPrice(e.target.value); // Update the dealPrice state with the parsed number or 0 if NaN
    };

    const goProviderProfile = (providerID) => {
        navigate(`/service-provider-profile-view/${providerID}`);
    };

    const getPermission = async (message) => {
        const payload = {
            eventID: message?.eventID,
            userID: message?.userID,
            providerID: message?.providerID,
        };
        try {
            const res = await userServices.getPermission(payload);
            setIsSendAllowed(true);
            // showToast('send allowed', { status: 'success' });
        } catch (error) {
            setIsSendAllowed(false);
        }
    };

    const approvePermissionAfterPaymentSucceed = async () => {
        const payload = {
            eventID: mainEvent.eventID,
            userID: mainEvent.userID,
            providerID: mainEvent.providerID,
            permissionValue: true,
            paymentwaiting: true,
        };
        try {
            const res = await userServices.approvePermission(payload);
            fetchData();
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    const approveConnectionRequest = async (message) => {
        const payload = {
            eventID: message.eventID,
            userID: message.userID,
            providerID: message.providerID,
        };
        try {
            const res = await userServices.approvePermission(payload);
            fetchData();
            showToast('request approved successfuly', { status: 'success' });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };
    // useEffect(() => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [newMessage]);

    useEffect(() => {
        fetchData();
        return () => {};
    }, [selectedRoom]);

    const fetchData = async () => {
        let payload;
        if (user.isMainUser) {
            payload = {
                providerID: selectedRoom?.senderID,
            };
        } else {
            payload = {
                userID: selectedRoom?.senderID,
            };
        }
        try {
            let res;
            if (user.isMainUser) {
                res = await userServices.getDetailedMessages(payload);
            } else {
                res = await providerServices.getDetailedMessages(payload);
            }
            setMessages(res.data);
            let mainEvent = null;
            for (let i = res.data.length - 1; i >= 0; i--) {
                if (res.data[i].eventID !== '') {
                    mainEvent = res.data[i];
                    break; // Stop the loop once a matching item is found
                }
            }
            if (mainEvent !== null) {
                setMainEvent(mainEvent);
                getPermission(mainEvent);
            } else {
                console.log('No item with non-empty eventID found.');
            }
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };
    const approveRequest = async (message) => {
        const payload = {
            eventID: message.eventID,
            userID: message.userID,
            providerID: message.providerID,
        };
        try {
            const res = await userServices.approvePermission(payload);
            fetchData();
            showToast('request approved successfuly', { status: 'success' });
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    const approveDeal = async () => {
        const payload = {
            userID: mainEvent.userID,
            eventID: mainEvent.eventID,
            providerID: mainEvent.providerID,
            msgID: mainEvent.id,
        };

        try {
            const res = await userServices.approveDeal(payload);
            await fetchData();
        } catch (error) {
            showToast(error, { status: 'error' });
        }
    };

    const sendMessage = async (e, message) => {
        e.preventDefault();
        let payload;
        if (newMessage.trim() !== '') {
            if (user.isMainUser) {
                payload = {
                    msg: newMessage,
                    userID: user.id,
                    providerID: message.providerID,
                    senderID: user.id,
                    type: 2,
                };
            } else {
                payload = {
                    msg: newMessage,
                    userID: message.userID,
                    providerID: user.id,
                    senderID: user.id,
                    type: 2,
                };
            }
            try {
                let res;
                if (user.isMainUser) {
                    res = await userServices.sendMessage(payload);
                } else {
                    res = await providerServices.sendMessage(payload);
                }
                setNewMessage('');
                await fetchData();
            } catch (error) {
                showToast(error, { status: 'error' });
            }
        }
    };

    const renderMessage = (message, index) => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);

        if (message.type === 1 && message.providerID !== user.id) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Event request
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {message.eventObj.title}
                            </Text>
                            <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            <Text fontSize="xs">Event Date: {message.eventObj.eventDate}</Text>
                            <Text fontSize="xs">Event duration: {message.eventObj.duration} hrs</Text>
                            <Text fontSize="xs">Event avg cost: {message.eventObj.averageCost}</Text>
                            {isSendAllowed && (
                                <Box mt={3}>
                                    <Divider></Divider>
                                    <Text mt={3} textAlign={'center'}>
                                        Event accepted
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Flex>
            );
        } else if (message.type === 1) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Event request
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {message.eventObj.title}
                            </Text>
                            <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            <Text fontSize="xs">Event Date: {message.eventObj.eventDate}</Text>
                            <Text fontSize="xs">Event duration: {message.eventObj.duration} hrs</Text>
                            <Text fontSize="xs">Event avg cost: {message.eventObj.averageCost}</Text>
                            {!isSendAllowed && mainEvent.eventID == message.eventID ? (
                                <Button onClick={() => approveRequest(message)} fontSize={'sm'} width={'100%'} mt={5}>
                                    Approve request
                                </Button>
                            ) : (
                                <Box mt={3}>
                                    <Divider></Divider>
                                    <Text mt={3} textAlign={'center'}>
                                        Event accepted
                                    </Text>
                                </Box>
                            )}
                            <Button fontSize={'sm'} width={'100%'} onClick={() => openModal(message)} mt={3}>
                                See event
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            );
        } else if (message.type === 4) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Connection request
                            </Text>
                            <Box margin={4} padding={4} bg={message.senderID === user.id ? 'gray.100' : 'primary.400'} borderRadius={'md'}>
                                <Text fontSize="sm" fontWeight="bold">
                                    {message.eventObj.title}
                                </Text>
                                <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            </Box>
                            {message.senderID !== user.id ? (
                                <Text fontSize="xs">Someone requested connection to discuss event details with you</Text>
                            ) : (
                                <Text fontSize="xs">You just requested connection to discuss event details with the auther</Text>
                            )}
                            {message.senderID !== user.id && (
                                <>
                                    <Button onClick={() => approveConnectionRequest(message)} fontSize={'sm'} width={'100%'} mt={5}>
                                        Approve request
                                    </Button>
                                    <Button onClick={() => goProviderProfile(message.senderID)} fontSize={'sm'} width={'100%'} mt={2}>
                                        Visit profile
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Flex>
            );
        } else if (message.type === 3) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Request accepted
                            </Text>
                            <Box margin={4} padding={4} bg={message.senderID === user.id ? 'gray.100' : 'primary.400'} borderRadius={'md'}>
                                <Text fontSize="sm" fontWeight="bold">
                                    {message.eventObj.title}
                                </Text>
                                <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            );
        } else if (message.type === 5) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Deal request
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {message.eventObj.title}
                            </Text>
                            <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            <Text fontSize="xs">Deal price: {message.msg}</Text>
                            {message.senderID !== user.id && mainEvent.eventID == message.eventID && mainEvent.type != 6 && (
                                <Button onClick={approveDeal} fontSize={'sm'} width={'100%'} mt={5}>
                                    Accept deal
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Flex>
            );
        } else if (message.type === 6) {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" m={2} borderRadius="lg" bg={message.senderID === user.id ? 'green.500' : 'green.500'} color={message.senderID === user.id ? 'white' : 'white'}>
                        <Box borderRadius="lg" p="4">
                            <Text fontSize="sm" fontWeight="bold">
                                Deal approved
                            </Text>
                            <Text fontSize="sm" fontWeight="bold">
                                {message.eventObj.title}
                            </Text>
                            <Text fontSize="xs">Description: {message.eventObj.desc}</Text>
                            <Text fontSize="xs">Deal price: {message.msg}</Text>
                        </Box>
                    </Box>
                </Flex>
            );
        } else {
            return (
                <Flex key={index} justifyContent={message.senderID === user.id ? 'flex-end' : 'flex-start'}>
                    <Box maxW="70%" p={3} m={3} borderRadius="lg" bg={message.senderID === user.id ? 'gray.200' : 'primary.500'} color={message.senderID === user.id ? 'black' : 'white'}>
                        <Text fontSize={'xs'}>{message.msg}</Text>
                    </Box>
                </Flex>
            );
        }
    };

    console.log('main', mainEvent);

    return selectedRoom ? (
        <Box p={4}>
            <VStack spacing={4} mb={4} align="stretch">
                <Box textAlign={'end'} marginBottom={'-3'} marginTop={'-6'}>
                    {user?.isMainUser && mainEvent?.type != 6 && isSendAllowed ? (
                        <Button onClick={openDealModal} colorScheme="primary" size="md" mt={4} rightIcon={<Icon as={FaHandshake} />}>
                            Make a Deal
                        </Button>
                    ) : null}
                </Box>
                <Box borderWidth={1} borderRadius={10} h="calc(100vh - 400px)" overflowY="scroll">
                    {messages.map((message, index) => renderMessage(message, index))}
                    <div ref={messagesEndRef}></div>
                </Box>
                {user?.isMainUser && mainEvent?.type == 6 && mainEvent?.eventObj?.status != 3 ? (
                    <Box>
                        <Button onClick={checkoutSim} colorScheme="primary" size="md" mt={4} rightIcon={<Icon as={FaCcVisa} />}>
                            Proceed to payment
                        </Button>
                    </Box>
                ) : (
                    <form onSubmit={(e) => sendMessage(e, messages[0])}>
                        <Flex>
                            <Input
                                disabled={!isSendAllowed}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={isSendAllowed ? 'Type a message...' : 'Send not allowed'}
                                flex="1"
                                mr={2}
                                borderRadius={10}
                                p={2}
                            />
                            <Button isDisabled={!isSendAllowed} px={0} type="submit" colorScheme="primary.500" variant="ghost" borderRadius="full">
                                <Icon as={FaPaperPlane} />
                            </Button>
                        </Flex>
                    </form>
                )}
            </VStack>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent minW={800}>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box borderRadius="lg" p="4">
                            <Box mb={6}>
                                <Text mb={4} fontSize="sm" fontWeight="medium" color={'gray.500'}>
                                    Created By
                                </Text>
                                <Text fontSize="sm" fontWeight="bold">
                                    {eventData?.senderName}
                                </Text>
                            </Box>
                            <Text mb={2} fontSize="sm" fontWeight="medium" color={'gray.500'}>
                                info
                            </Text>
                            <Box borderColor={'gray.400'} borderWidth={1} borderRadius={'xl'} p={4}>
                                <Text fontSize="sm" fontWeight="bold">
                                    {eventData?.message?.eventObj?.title}
                                </Text>
                                <Text fontSize="xs">Description: {eventData?.message?.eventObj?.desc}</Text>
                                <Text fontSize="xs">Event Date: {eventData?.message?.eventObj?.eventDate}</Text>
                                <Text fontSize="xs">Event duration: {eventData?.message?.eventObj?.duration} hrs</Text>
                                <Text fontSize="xs">Event avg cost: {eventData?.message?.eventObj?.averageCost}</Text>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isDealModalOpen} onClose={closeDealModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mt={10} textAlign={'end'}>
                            <Input type="number" placeholder="Enter deal price" value={dealPrice} onChange={handlePriceChange} />
                            <Button colorScheme="primary" mt={4} onClick={handleSubmitDeal}>
                                Submit
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    ) : (
        <Box mt={9} textAlign="center" fontSize="xl">
            Choose a room to start messaging
        </Box>
    );
};

export default Messaging;
