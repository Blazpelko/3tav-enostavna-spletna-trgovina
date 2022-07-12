import useStore from '../storeElement';
import { Center, Text, VStack, Box, HStack, Divider, ScrollView } from "native-base";
import FormNarocilo from "../components/FormNarocilo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

function BasketOverview() {
  const { selected } = useStore();

  function cena() {
    let sum = 0;
    selected.forEach(function (i) {
      sum += i.product.cena * i.st;
    });
    return sum;
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@testStore');
      // console.log(JSON.parse(jsonValue));
      return jsonValue != null ? await JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("Error reading date from global storage.", e);
    }
  }

  return (
    // <Center p="2">
    (selected.length === 0) ? <Center p="2"><Text fontSize="md" >V košarici ni elementov</Text></Center> :

      <Box p="2">
        <Box w="100%" bg="gray.200" p="3" rounded="md">
          <VStack>
            <HStack justifyContent="space-between">
              <Text onPress={() => {console.log("sort todo")}} fontSize="lg">Ime izdelka</Text>
              <Text fontSize="lg">Cena</Text>
              <Text fontSize="lg">Količina</Text>
            </HStack>
            <Divider my="1" bg="muted.800" />
            {selected.map((ele) =>
              <HStack key={ele.product.id} justifyContent="space-between">
                <Text>{ele.product.id}</Text>
                <Text>${ele.product.cena}</Text>
                <Text>{ele.st}</Text>
              </HStack>
            )}
            <Divider my="1" bg="muted.800" />
            <Box alignItems="flex-end">
              <Text alignItems="flex-end" fontSize="lg">Skupaj {cena()}$</Text>
            </Box>
          </VStack>
        </Box>
        <FormNarocilo />
      </Box>
  );
}

export default function Basket() {
  return (
    <BasketOverview />
  );
}