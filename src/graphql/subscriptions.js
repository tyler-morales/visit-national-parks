/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSite = /* GraphQL */ `
  subscription OnCreateSite($owner: String) {
    onCreateSite(owner: $owner) {
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
      collections {
        items {
          id
          name
          createdAt
          updatedAt
          siteCollectionsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSite = /* GraphQL */ `
  subscription OnUpdateSite($owner: String) {
    onUpdateSite(owner: $owner) {
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
      collections {
        items {
          id
          name
          createdAt
          updatedAt
          siteCollectionsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSite = /* GraphQL */ `
  subscription OnDeleteSite($owner: String) {
    onDeleteSite(owner: $owner) {
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
      collections {
        items {
          id
          name
          createdAt
          updatedAt
          siteCollectionsId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String) {
    onCreateCollection(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      siteCollectionsId
      owner
    }
  }
`;
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String) {
    onUpdateCollection(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      siteCollectionsId
      owner
    }
  }
`;
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String) {
    onDeleteCollection(owner: $owner) {
      id
      name
      createdAt
      updatedAt
      siteCollectionsId
      owner
    }
  }
`;
