import { gql } from '@apollo/client';

const GET_USER_INFO = gql`
  query UserInfo($username: String!, $after: String, $before: String) {
    user(login: $username) {
      name
      bio
      url
      avatarUrl
      websiteUrl
      contributionsCollection {
        totalCommitContributions
      }
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }, after: $after, before: $before,privacy:PUBLIC) {
        totalCount
        nodes {
          url
          name
          description
          forkCount
          homepageUrl
          stargazers {
            totalCount
          }
          refs(refPrefix: "refs/heads/", first: 10) {
            totalCount
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

export { GET_USER_INFO };
