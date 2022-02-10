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
export const onCreateCollection = /* GraphQL */ `
  subscription OnCreateCollection($owner: String) {
    onCreateCollection(owner: $owner) {
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
export const onUpdateCollection = /* GraphQL */ `
  subscription OnUpdateCollection($owner: String) {
    onUpdateCollection(owner: $owner) {
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
export const onDeleteCollection = /* GraphQL */ `
  subscription OnDeleteCollection($owner: String) {
    onDeleteCollection(owner: $owner) {
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
export const onCreateSiteCollections = /* GraphQL */ `
  subscription OnCreateSiteCollections($owner: String) {
    onCreateSiteCollections(owner: $owner) {
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
export const onUpdateSiteCollections = /* GraphQL */ `
  subscription OnUpdateSiteCollections($owner: String) {
    onUpdateSiteCollections(owner: $owner) {
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
export const onDeleteSiteCollections = /* GraphQL */ `
  subscription OnDeleteSiteCollections($owner: String) {
    onDeleteSiteCollections(owner: $owner) {
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
