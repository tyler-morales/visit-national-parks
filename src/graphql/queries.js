/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      code
      owner
      visited
      bookmarked
      name
      img
      rating
      avgRating
      dateVisited
      createdAt
      updatedAt
    }
  }
`;
export const listSites = /* GraphQL */ `
  query ListSites(
    $filter: ModelSiteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        owner
        visited
        bookmarked
        name
        img
        rating
        avgRating
        dateVisited
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
