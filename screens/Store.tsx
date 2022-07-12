import { RootTabScreenProps, Izdelek, IzdelekKosarica } from '../types';
import React, { useEffect } from "react";
import { VStack, Fab, Center, Box, ScrollView, HStack, Text, Button, IconButton, Icon, Badge, Pressable } from "native-base";
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
  }

  function badge(ele: any) {
    let temp = content.find((el: IzdelekKosarica) => el.product.id === ele.id);
    if (typeof temp !== 'undefined') {
      return <Badge mt={-2} colorScheme="danger" rounded="full" mb={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{ fontSize: 12 }}>{temp.st}</Badge>
    }
  }

  return (
    <Center w="100%" mt="2">
      <VStack w="100%" space={3} alignItems="center">

        {izdelki.map((ele, i) =>
          <Box key={ele.id} w="100%" shadow="3">
            {badge(ele)}
            <Box w="100%" bg="gray.200" p="2" rounded="xl" >
              <HStack>
                <Box w="90px" h="90px" bg="coolGray.500" rounded="xl" alignItems="center" justifyContent="center" shadow="3">
                  <Icon as={Entypo} name="image" size="6xl" color="black" />
                </Box>
                <HStack justifyContent="space-between" flex={1}>
                  <VStack ml="2">
                    <Text bold>{ele.id}</Text>
                    <Text>{ele.value}</Text>
                    <Text>${ele.cena}</Text>
                  </VStack>
                  <HStack>
                    {/* <IconButton icon={<Icon as={Feather} name="plus" size="xl" color="black" />} onPress={() => increment(ele)} />
                    <IconButton icon={<Icon as={Entypo} name="minus" size="xl" color="black" />} onPress={() => decrement(ele)} /> */}
                    <Pressable justifyContent="center" mb="3" onPress={() => increment(ele)}>
                      {({
                        isPressed
                      }) => {
                        return <Box maxW="100" borderWidth="1" borderColor="coolGray.300" shadow="2" bg={isPressed ? 'coolGray.200' : 'coolGray.100'} p="3" rounded="8" style={{
                          transform: [{ scale: isPressed ? 0.95 : 1 }]
                        }} >
                          <Icon as={Feather} name="plus" size="md" color="black" />
                        </Box>;
                      }}
                    </Pressable>
                    <Pressable ml="2" mt="3" justifyContent="center" onPress={() => decrement(ele)}>
                      {({
                        isPressed
                      }) => {
                        return <Box maxW="100" borderWidth="1" borderColor="coolGray.300" shadow="2" bg={isPressed ? 'coolGray.200' : 'coolGray.100'} p="3" rounded="8" style={{
                          transform: [{ scale: isPressed ? 0.96 : 1 }]
                        }}>
                         <Icon as={Entypo} name="minus" size="md" color="black" />
                        </Box>;
                      }}
                    </Pressable>

                  </HStack>
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