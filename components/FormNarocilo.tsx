import useStore from '../storeElement';
import { Center, Text, VStack, Box, HStack, Divider, Button, Modal,Input,KeyboardAvoidingView   } from "native-base";
import { useState } from "react";
import create from 'zustand';
import { Form } from '../types';
import {  RootTabScreenProps } from '../types';
import { useNavigation } from '@react-navigation/native';

const ddv = 0.22;

export default function formNarocilo() {
    const { selected } = useStore();

    const [showModal, setShowModal] = useState(false);

    function cena() {
        let sum = 0;
        selected.forEach(function (i) {
            sum += i.product.cena * i.st;
        });
        return sum;
    }

    //Use store za form
    const useStoreForm = create<Form>((set) => ({
        cena: cena(),
        // addElement: (e) => set((state) => ({ selected: [...state.selected, e] })),
    }))

    const cenaRacun = useStoreForm((state) => state.cena);
    
    const navigation= useNavigation();

    return (
        <Box alignItems="flex-end">
            <Button mt="2" w="100" onPress={() => setShowModal(true)}>Na plačilo</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
                <Modal.Content maxWidth="100%">
                    <Modal.CloseButton />
                    <Modal.Header>Naročilo</Modal.Header>
                    <Modal.Body>
                        <VStack space={3}>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Cena brez DDV</Text>
                                <Text color="blueGray.400">${cenaRacun - cenaRacun * ddv}</Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">DDV</Text>
                                <Text color="blueGray.400">${cenaRacun * ddv}</Text>
                            </HStack>
                            <HStack alignItems="center" justifyContent="space-between">
                                <Text fontWeight="medium">Skupaj</Text>
                                <Text color="green.500">${cenaRacun}</Text>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={() => {setShowModal(false);navigation.navigate('FormScreen');}}>
                            Naprej
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Box>
    );
}