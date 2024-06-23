import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { createRepo } from '../services/githubService';

const RepoModal = ({ token, onRepoCreated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [repoName, setRepoName] = useState('');
  const [repoDescription, setRepoDescription] = useState('');

  const handleSubmit = async () => {
    try {
      const newRepo = { name: repoName, description: repoDescription };
      const response = await createRepo(token, newRepo);
      onRepoCreated(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating repo:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Create New Repo</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Repository</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Repository Name</FormLabel>
              <Input
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RepoModal;