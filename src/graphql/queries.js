/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSite = /* GraphQL */ `
  query GetSite($id: ID!) {
    getSite(id: $id) {
      id
      code
      owner
      name
      img
      visited
      bookmarked
      rating
      review
      avgRating
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
        name
        img
        visited
        bookmarked
        rating
        review
        avgRating
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
