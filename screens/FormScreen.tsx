import { Stack, Box, FormControl, KeyboardAvoidingView, Input, Alert, VStack, HStack, Text, ScrollView, Button } from "native-base";
import { Platform } from 'react-native';
import create from 'zustand';
import { FormSumbit } from '../types';
import useStore from '../storeElement';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormStore = create<FormSumbit>((set) => ({
    ime: "",
    priimek: "",
    email: "",
    naslov: "",
    posta: "",
    postnaSt: "",
    handleChange: (target: string, value: string) => set((state) => ({ [target]: value })),
    clean:  () => set((state) => ({ime: "",priimek: "",email: "",naslov: "",posta: "",postnaSt: "",})),
}));

const storeData = async (value:any) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@testStore', jsonValue)
    } catch (e) {
        console.log("Error at saving data to global storage.",e);
    }
    console.log('Done save.')
}


export default function Basket() {

    const { clean,selected } = useStore();
    const navigation = useNavigation();

    const [alert, SetAlert] = useState(false);

    const handleChange = FormStore((state) => state.handleChange);
    const pocistiFormStore = FormStore((state) => state.clean);
    const ime = FormStore((state) => state.ime);
    const priimek = FormStore((state) => state.priimek);
    const email = FormStore((state) => state.email);
    const naslov = FormStore((state) => state.naslov);
    const posta = FormStore((state) => state.posta);
    const postnaSt = FormStore((state) => state.postnaSt);

    function handleSubmit() {
        //Shrani naročilo
        let temp={
            selected:selected,
            ime:ime,
            priimek:priimek,
            email:email,
            naslov:naslov,
            posta:posta,
            postnaSt:postnaSt,
            datum: new Date(),
        }
        storeData(temp);
        //Pobriši store...
        clean();
        SetAlert(true);
        //Vrni na začetni meni
        setTimeout(() => navigation.navigate('Root', { screen: 'Store' }), 3000);
        pocistiFormStore();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Box p="3" h="100%" bg="grey.200">
                {alert === true && <Popup />}
                <Box>
                    <FormControl isRequired>
                        <VStack>
                            <FormControl.Label>Ime</FormControl.Label>
                            <Input type="text" placeholder="ime" value={ime} bg="coolGray.300" size="xl" variant="outline" onChangeText={(value) => { handleChange("ime", value) }} />
                            <FormControl.Label>Priimek</FormControl.Label>
                            <Input type="text" placeholder="priimek" value={priimek} bg="coolGray.300" size="xl" variant="outline" onChangeText={(value) => { handleChange("priimek", value) }} />
                            <FormControl.Label>Elektronski naslov</FormControl.Label>
                            <Input type="text" placeholder="elektronski naslov" bg="coolGray.300" value={email} size="xl" variant="outline" onChangeText={(value) => { handleChange("email", value) }} />
                            <FormControl.Label>Naslov prebivališča</FormControl.Label>
                            <Input type="text" placeholder="naslov prebivališča" bg="coolGray.300" value={naslov} size="xl" variant="outline" onChangeText={(value) => { handleChange("naslov", value) }} />
                            <HStack justifyContent="space-between">
                                <VStack w="60%">
                                    <FormControl.Label>Ime pošte</FormControl.Label>
                                    <Input type="text" placeholder="ime pošte" bg="coolGray.300" value={posta} size="xl" variant="outline" onChangeText={(value) => { handleChange("posta", value) }} />
                                </VStack>
                                <VStack w="35%">
                                    <FormControl.Label>Številka pošte</FormControl.Label>
                                    <Input type="text" placeholder="številka pošte" bg="coolGray.300" value={postnaSt} size="xl" variant="outline" onChangeText={(value) => { handleChange("postnaSt", value) }} />
                                </VStack>
                            </HStack>
                            <Button disabled={ime.length === 0 || priimek.length === 0 || email.length === 0 || naslov.length === 0 || posta.length === 0 || postnaSt.length === 0} mt="3" onPress={handleSubmit}>Submit</Button>
                            {/* disabled={ime.length === 0 || priimek.length === 0 || email.length === 0 || naslov.length === 0 || posta.length === 0 || postnaSt.length === 0} */}
                        </VStack>
                    </FormControl>
                </Box>
            </Box>
        </KeyboardAvoidingView>
    );
}


const Popup = () => {
    return (
        <Alert m="1" w="100%" variant={"left-accent"} colorScheme="success" status="success">
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text>
                            Naročilo uspešno kreirano
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
}