import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Text, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { getRepoDetails, updateRepo, deleteRepo } from '../services/githubService';

const RepoDetailsPage = () => {
  const { name } = useParams();
  const [repo, setRepo] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [username] = useState('your-username'); // replace with your GitHub username
  const [token] = useState('your-github-token'); // replace with your GitHub token

  useEffect(() => {
    getRepoDetails(username, name)
      .then(response => {
        setRepo(response.data);
        setNewDescription(response.data.description || '');
      })
      .catch(error => {
        console.error('Error fetching repo:', error);
      });
  }, [name, username]);

  const handleUpdate = async