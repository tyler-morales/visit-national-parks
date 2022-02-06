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
`
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
        dateVisited
        collections {
          items {
            collectionID
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getCollection = /* GraphQL */ `
  query GetCollection($id: ID!) {
    getCollection(id: $id) {
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
`
export const listCollections = /* GraphQL */ `
  query ListCollections(
    $filter: ModelCollectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        sites {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getSiteCollections = /* GraphQL */ `
  query GetSiteCollections($id: ID!) {
    getSiteCollections(id: $id) {
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
`
export const listSiteCollections = /* GraphQL */ `
  query ListSiteCollections(
    $filter: ModelSiteCollectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSiteCollections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        collection {
          id
          name
          owner
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`
