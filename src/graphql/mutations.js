/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSite = /* GraphQL */ `
  mutation CreateSite(
    $input: CreateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    createSite(input: $input, condition: $condition) {
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
      dateVisited
      createdAt
      updatedAt
    }
  }
`;
export const updateSite = /* GraphQL */ `
  mutation UpdateSite(
    $input: UpdateSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    updateSite(input: $input, condition: $condition) {
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
      dateVisited
      createdAt
      updatedAt
    }
  }
`;
export const deleteSite = /* GraphQL */ `
  mutation DeleteSite(
    $input: DeleteSiteInput!
    $condition: ModelSiteConditionInput
  ) {
    deleteSite(input: $input, condition: $condition) {
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
      dateVisited
      createdAt
      updatedAt
    }
  }
`;
