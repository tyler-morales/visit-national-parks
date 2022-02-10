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
      collections {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
      collections {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
      collections {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCollection = /* GraphQL */ `
  mutation CreateCollection(
    $input: CreateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    createCollection(input: $input, condition: $condition) {
      id
      name
      owner
      sites {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCollection = /* GraphQL */ `
  mutation UpdateCollection(
    $input: UpdateCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    updateCollection(input: $input, condition: $condition) {
      id
      name
      owner
      sites {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCollection = /* GraphQL */ `
  mutation DeleteCollection(
    $input: DeleteCollectionInput!
    $condition: ModelCollectionConditionInput
  ) {
    deleteCollection(input: $input, condition: $condition) {
      id
      name
      owner
      sites {
        items {
          id
          siteID
          collectionID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSiteCollections = /* GraphQL */ `
  mutation CreateSiteCollections(
    $input: CreateSiteCollectionsInput!
    $condition: ModelSiteCollectionsConditionInput
  ) {
    createSiteCollections(input: $input, condition: $condition) {
      id
      siteID
      collectionID
      site {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      collection {
        id
        name
        owner
        sites {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateSiteCollections = /* GraphQL */ `
  mutation UpdateSiteCollections(
    $input: UpdateSiteCollectionsInput!
    $condition: ModelSiteCollectionsConditionInput
  ) {
    updateSiteCollections(input: $input, condition: $condition) {
      id
      siteID
      collectionID
      site {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      collection {
        id
        name
        owner
        sites {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteSiteCollections = /* GraphQL */ `
  mutation DeleteSiteCollections(
    $input: DeleteSiteCollectionsInput!
    $condition: ModelSiteCollectionsConditionInput
  ) {
    deleteSiteCollections(input: $input, condition: $condition) {
      id
      siteID
      collectionID
      site {
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
          nextToken
        }
        createdAt
        updatedAt
      }
      collection {
        id
        name
        owner
        sites {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
