# Modules

A module abstracts how to deal with data using our connectors.

It is decoupled in different layers that only knows what they need to do their jobs.

## Constants

Constants used in module.

It usually contains strings, enums, maps...

## Container

A container is a context-aware wrapper for a model.

Containers can grow quickly (authentication + authorization + link + trigger notification + ...). 
We can separate concerns inside containers using composition of functional mixins.

It usually handles authentication / authorization and the links between models.

Ex: if removing an entity should cascade remove other entities, the container should be responsible for handling the cascade remove.

## Model

A model is a layer that control access to a resource.

For instance we use model as a shell wrapper for a MongoDB collection or an api endpoint.

It usually contains the CRUD operations and handle params validation.

## Resolver

A resolver **maps** the types and functions from our GraphQL types to the model.

A resolver is context-aware and thus knows everything about the IO of the api.

We added another abstraction (container) (also context-aware) to handle links between models and side effects.

## Schema

A schema represents both graphql type and resolver.

It is used as an helper in our module system to build the whole api schema.

## Types

Type definitions for GraphQL (and Flow).

A GraphQL type is the core representation of our data.

It describes the IO of our api.

# FAQ

1.  Why not writing container logic in resolver ?

A resolver is a GraphQL abstraction that deals with GraphQL concepts like type resolvers, queries, mutations and subscriptions.

The container concept is just a methods wrapper and can be used in any other project like a REST api for instance.
