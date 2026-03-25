import { PRODUCT_FRAGMENT } from './products'

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    title
    handle
    description
    image {
      url
      altText
      width
      height
    }
  }
`

export const GET_COLLECTION_QUERY = `
  ${PRODUCT_FRAGMENT}
  ${COLLECTION_FRAGMENT}
  query GetCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      ...CollectionFragment
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
`

export const GET_COLLECTIONS_QUERY = `
  ${COLLECTION_FRAGMENT}
  query GetCollections {
    collections(first: 20) {
      edges {
        node {
          ...CollectionFragment
          products(first: 4) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`
