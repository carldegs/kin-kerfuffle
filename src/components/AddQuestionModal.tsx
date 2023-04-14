import { Question } from '@/modules/game/game';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalProps,
  ModalCloseButton,
  Stack,
  HStack,
  SimpleGrid,
  Text,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { Trash } from '@phosphor-icons/react';
import React, { Fragment } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import XSimpleFormControl from './form/XSimpleFormControl';

type FormData = Omit<Question, 'id'>;

const AddQuestionModal: React.FC<Omit<ModalProps, 'children'>> = ({
  isOpen,
  onClose,
}) => {
  const methods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      question: 'test',
    },
  });
  const { control, watch, formState } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const totalScore = (watch('answers') || []).reduce(
    (sum, ans) => +ans.score + sum,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <FormProvider {...methods}>
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <XSimpleFormControl
              name="question"
              label="Question"
              registerOptions={{ required: true, minLength: 1, maxLength: 256 }}
            />

            <Stack mt={6}>
              <SimpleGrid
                columns={4}
                spacingX={4}
                spacingY={2}
                alignItems="flex-start"
              >
                <Text
                  fontSize="sm"
                  letterSpacing="wide"
                  fontWeight="bold"
                  gridColumn="span 3"
                >
                  ANSWER
                </Text>
                <Text fontSize="sm" letterSpacing="wide" fontWeight="bold">
                  SCORE
                </Text>
                {fields.map((field, idx) => (
                  <Fragment key={field.id}>
                    <XSimpleFormControl
                      name={`answers.${idx}.answer`}
                      gridColumn="span 3"
                      registerOptions={{
                        required: true,
                        minLength: 1,
                        maxLength: 64,
                      }}
                    />
                    <HStack>
                      <XSimpleFormControl
                        name={`answers.${idx}.score`}
                        registerOptions={{
                          required: true,
                          min: 1,
                          max: 100,
                        }}
                      />
                      <IconButton
                        icon={<Trash />}
                        aria-label="Delete"
                        onClick={() => {
                          remove(idx);
                        }}
                        isDisabled={fields.length <= 1}
                      />
                    </HStack>
                  </Fragment>
                ))}
                <Box gridColumn="span 3" />
                {fields.length >= 1 && (
                  <Text
                    fontWeight="bold"
                    ml={4}
                    color={totalScore === 100 ? 'green.500' : 'red.500'}
                    py={2}
                  >
                    {totalScore}
                    {totalScore !== 100 ? ` (${100 - totalScore})` : ''}
                  </Text>
                )}
              </SimpleGrid>
              <Button
                onClick={() => {
                  append({
                    answer: '',
                    score: null as any,
                  });
                }}
              >
                Add Answer
              </Button>
            </Stack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button>Close</Button>
            <Button
              colorScheme="green"
              isDisabled={
                totalScore !== 100 || !formState.isDirty || !formState.isValid
              }
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </FormProvider>
    </Modal>
  );
};

export default AddQuestionModal;
