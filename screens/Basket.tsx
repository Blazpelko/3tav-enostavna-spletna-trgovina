import useStore from '../storeElement';
import { Center, Text, VStack, Box, HStack, Divider, ScrollView, Button ,Select,CheckIcon} from "native-base";
import FormNarocilo from "../components/FormNarocilo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';

function BasketOverview() {
  const { selected,sortBy } = useStore();

  function cena() {
    let sum = 0;
    selected.forEach(function (i) {
      sum += i.product.cena * i.st;
    });
    return sum;
  }

  return (
    // <Center p="2">
    (selected.length === 0) ? <Center p="2"><Text fontSize="md" >V košarici ni elementov</Text></Center> :

      <Box p="2">
        <Box w="100%" bg="gray.200" p="3" rounded="md">
          <VStack>
            <HStack justifyContent="space-between">
              <Text onPress={() => { console.log("sort todo") }} fontSize="lg">Ime izdelka</Text>
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
            <HStack  justifyContent="space-between">
              <Select shadow={2} w="150px" accessibilityLabel="Choose Service" placeholder="Razvrsti po:"
                bg='coolGray.100'
                onValueChange={val => sortBy(val)}>  
                <Select.Item shadow={2} label="Po imenu" value="ime" />
                <Select.Item shadow={2} label="Po ceni" value="cena" />
                <Select.Item shadow={2} label="Po skupni ceni" value="cenaSkupna" />
              </Select>
              <Text alignItems="flex-end" fontSize="lg">Skupaj {cena()}$</Text>
            </HStack>
          </VStack>
        </Box>
        <FormNarocilo />
      </Box>
  );
}

export default function Basket() {
  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@testStore');
  //     console.log( await JSON.parse(jsonValue));
  //     return jsonValue != null ? await JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.log("Error reading date from global storage.", e);
  //   }
  // }
  // const data = getData();
  return (
    <>
      <BasketOverview />
      {/* <Box>
        <Button onPress={() => console.log("data")}><Text>test</Text></Button>
        {typeof data._w !=='object' && }
      </Box> */}
    </>
  );
}