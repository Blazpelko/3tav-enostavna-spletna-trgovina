import { Stack, Box, FormControl, KeyboardAvoidingView, Input, VStack, HStack, ScrollView, Button } from "native-base";
import { Platform } from 'react-native';
import create from 'zustand';
import { FormSumbit } from '../types';


const FormStore = create<FormSumbit>((set) => ({
    ime: "",
    priimek: "",
    email: "",
    naslov: "",
    posta: "",
    postnaSt: "",
    handleChange: (target: string, value: string) => set((state) => ({ [target]: value })),
}));


export default function Basket() {

    const handleChange = FormStore((state) => state.handleChange);
    const ime = FormStore((state) => state.ime);
    const priimek = FormStore((state) => state.priimek);
    const email = FormStore((state) => state.email);
    const naslov = FormStore((state) => state.naslov);
    const posta = FormStore((state) => state.posta);
    const postnaSt = FormStore((state) => state.postnaSt);

    function handleSubmit() {
        //Pobriši store...
        //Vrni na začetni meni
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Box p="3" h="100%" bg="primary.100">
                <Box>
                    <FormControl isRequired>
                        <VStack>
                            <FormControl.Label>Ime</FormControl.Label>
                            <Input type="text" placeholder="ime" value={ime} size="xl" variant="outline" onChangeText={(value) => { handleChange("ime", value) }} />
                            <FormControl.Label>Priimek</FormControl.Label>
                            <Input type="text" placeholder="priimek" value={priimek} size="xl" variant="outline" onChangeText={(value) => { handleChange("priimek", value) }} />
                            <FormControl.Label>Elektronski naslov</FormControl.Label>
                            <Input type="text" placeholder="elektronski naslov" value={email} size="xl" variant="outline" onChangeText={(value) => { handleChange("email", value) }} />
                            <FormControl.Label>Naslov prebivališča</FormControl.Label>
                            <Input type="text" placeholder="naslov prebivališča" value={naslov} size="xl" variant="outline" onChangeText={(value) => { handleChange("naslov", value) }} />
                            <HStack justifyContent="space-between">
                                <VStack w="60%">
                                    <FormControl.Label>Ime pošte</FormControl.Label>
                                    <Input type="text" placeholder="ime pošte" value={posta} size="xl" variant="outline" onChangeText={(value) => { handleChange("posta", value) }} />
                                </VStack>
                                <VStack w="35%">
                                    <FormControl.Label>Številka pošte</FormControl.Label>
                                    <Input type="text" placeholder="številka pošte" value={postnaSt} size="xl" variant="outline" onChangeText={(value) => { handleChange("postnaSt", value) }} />
                                </VStack>
                            </HStack>
                            <Button disabled={ime.length === 0 || priimek.length === 0 || email.length === 0 || naslov.length === 0 || posta.length === 0 || postnaSt.length === 0} mt="3" onPress={handleSubmit}>Submit</Button>
                        </VStack>
                    </FormControl>
                </Box>
            </Box>
        </KeyboardAvoidingView>
    );
}