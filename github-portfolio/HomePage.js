import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Input, SimpleGrid, Text, Button } from '@chakra-ui/react';
import { getRepos } from '../services/githubService';
import RepoModal from '../components/RepoModal';

const HomePage = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [username] = useState('your-username'); // replace with your GitHub username
  const [token] = useState('your-github-token'); // replace with your GitHub token

  useEffect(() => {
    getRepos(username, currentPage)
      .then(response => {
        setRepos(response.data);
      })
      .catch(error => {
        console.error('Error fetching repos:', error);
      });
  }, [currentPage, username]);

  const handleRepoCreated = (newRepo) => {
    setRepos([...repos, newRepo]);
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={5}>
      <Input 
        placeholder="Search repositories..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <SimpleGrid columns={3} spacing={5} mt={5}>
        {filteredRepos.map(repo => (
          <Box key={repo.id} p={5} shadow="md" borderWidth="1px">
            <Link to={/repo/${repo.name}}>
              <Text fontSize="xl">{repo.name}</Text>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
      <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      <Button onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </Button>
      <RepoModal token={token} onRepoCreated={handleRepoCreated} />
    </Box>
  );
};

export default HomePage;