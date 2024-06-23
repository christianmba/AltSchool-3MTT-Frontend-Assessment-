import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com'
});

export const getRepos = (username, page = 1, perPage = 10) => {
  return githubApi.get(/users/${username}/repos, {
    params: { page, per_page: perPage }
  });
};

export const getRepoDetails = (username, repoName) => {
  return githubApi.get(/repos/${username}/${repoName});
};

export const createRepo = (token, repoData) => {
  return githubApi.post('/user/repos', repoData, {
    headers: { Authorization: token ${token} }
  });
};

export const updateRepo = (token, username, repoName, repoData) => {
  return githubApi.patch(/repos/${username}/${repoName}, repoData, {
    headers: { Authorization: token ${token} }
  });
};

export const deleteRepo = (token, username, repoName) => {
  return githubApi.delete(/repos/${username}/${repoName}, {
    headers: { Authorization: token ${token} }
  });
};