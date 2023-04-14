import AddQuestionModal from '@/components/AddQuestionModal';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Plus } from '@phosphor-icons/react';
import React from 'react';

import { useGame } from '../modules/game/context';

const SetupPage: React.FC = () => {
  const { questions } = useGame();
  const addQuestionDisc = useDisclosure();
  return (
    <Container maxW="container.xl">
      <AddQuestionModal
        isOpen={addQuestionDisc.isOpen}
        onClose={addQuestionDisc.onClose}
      />
      <SimpleGrid columns={2}>
        <Stack>
          <Heading fontSize="xl">Question List</Heading>
          {Object.keys(questions).length ? (
            <Accordion>
              {Object.values(questions).map(({ id, question }) => (
                <AccordionItem key={id}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {question}
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Center>
              <Text textAlign="center" py={4}>
                No questions found. Add one now.
              </Text>
            </Center>
          )}
          <Button leftIcon={<Plus />} onClick={addQuestionDisc.onOpen}>
            ADD QUESTION
          </Button>
        </Stack>
        <Stack>
          <Heading fontSize="xl">Setup Game</Heading>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

const GamePage: React.FC = () => {
  return <SetupPage />;
};

export default GamePage;
