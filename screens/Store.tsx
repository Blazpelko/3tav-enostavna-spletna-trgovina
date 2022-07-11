import { RootTabScreenProps,Izdelek,IzdelekKosarica } from '../types';
import React from "react";
import { VStack, Fab, Center, Box, ScrollView, HStack, Text, Button, IconButton, Icon, Badge } from "native-base";
import { Feather, Entypo } from "@expo/vector-icons";
import useStore from '../storeElement';

const izdelki = [
  { id: "Izdelek 1", value: "Opis izdelka 1", cena: 4 },
  { id: "Izdelek 2", value: "Opis izdelka 2", cena: 2 },
  { id: "Izdelek 3", value: "Opis izdelka 3", cena: 4 },
  { id: "Izdelek 4", value: "Opis izdelka 4", cena: 12 },
  { id: "Izdelek 5", value: "Opis izdelka 5", cena: 6 },
  { id: "Izdelek 6", value: "Opis izdelka 6", cena: 3 },
  { id: "Izdelek 7", value: "Opis izdelka 7", cena: 6 },
  { id: "Izdelek 8", value: "Opis izdelka 8", cena: 3 },
  { id: "Izdelek 9", value: "Opis izdelka 9", cena: 3 },
  { id: "Izdelek 10", value: "Opis izdelka 10", cena: 3 },
  { id: "Izdelek 11", value: "Opis izdelka 11", cena: 3 },
  { id: "Izdelek 12", value: "Opis izdelka 12", cena: 3 },
  { id: "Izdelek 13", value: "Opis izdelka 13", cena: 3 },
  { id: "Izdelek 14", value: "Opis izdelka 14", cena: 3 },
  { id: "Izdelek 15", value: "Opis izdelka 15", cena: 3 },
  { id: "Izdelek 16", value: "Opis izdelka 16", cena: 3 },
  { id: "Izdelek 17", value: "Opis izdelka 17", cena: 3 },
  { id: "Izdelek 18", value: "Opis izdelka 18", cena: 3 }
];

const Elementi = () => {
  const addElement = useStore((state) => state.addElement)
  const removeElement = useStore((state) => state.removeElement)
  const content = useStore((state) => state.selected);

  function increment(e: Izdelek) {
    addElement(e);
  }

  function decrement(e: Izdelek) {
    removeElement(e);
    console.log(content);
  }

  return (    
    <Center w="100%" mt="2">
      <VStack w="100%" space={3} alignItems="center">
        {izdelki.map(ele =>
          <Box key={ele.id} w="100%">            
            {typeof (content.find((el: IzdelekKosarica) => el.product.id === ele.id)) !== 'undefined' && <Badge mt={-2} colorScheme="danger" rounded="full" mb={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 12 }}>
              {content.find((el: IzdelekKosarica) => el.product.id === ele.id).st}
            </Badge>
            }
            <Box w="100%" bg="teal.300" p="5" rounded="xl">
              <HStack justifyContent="space-between">
                <VStack>
                  <Text bold>{ele.id}</Text>
                  <Text>{ele.value}</Text>
                </VStack>
                <HStack >
                  <IconButton icon={<Icon as={Feather} name="plus" size="md" color="black" />} onPress={() => increment(ele)} />
                  <IconButton icon={<Icon as={Entypo} name="minus" size="md" color="black" />} onPress={() => decrement(ele)} />
                </HStack>
              </HStack>
            </Box>
          </Box>
        )}
      </VStack>
    </Center>
  );
}
export default function Store({ navigation }: RootTabScreenProps<'Store'>) {
  return (
    <Center flex={1} p="1">
      <ScrollView w="100%">
        <Elementi />
      </ScrollView>
      {/* <Fab renderInPortal={true} shadow={2}  bottom={5} size="sm" icon={<Icon color="white" as={Feather} name="shopping-bag" size="4" />} /> */}
    </Center>
  );
}