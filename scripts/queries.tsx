import gql from 'graphql-tag'

export const QUERY_ALL_SHIPS = gql`
  query Ships {
    ships {
      type
      name
      weight_kg
      image
    }
  }
`
