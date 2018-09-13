# Modules

A module abstracts everything to deal with data using our connectors.

It is decoupled in different layers that only knows what they need to do their jobs.

It has been made to deal with (and easily test) small pieces separated by concerns.

## Constants

Constants used in module.

It usually contains strings, enums, maps...

## Container

A container is a context-aware wrapper for a model.

Containers can quickly grow (authentication + authorization + link + trigger notification + ...). This is why we separated concerns inside containers using composition of functional mixins.

It usually handles authentication / authorization and the links between models.

Ex: if removing an entity should cascade remove other entities, the container is responsible for handling the cascade remove.

## Model

A model is a layer that control access to a resource.

For instance we use model as a shell wrapper for a MongoDB collection or an api endpoint.

It usually contains the CRUD operations and handle params validation.

## Resolver

A resolver is a GraphQL abstraction. It **maps** the types and functions from our types to the container
(or model if there's no container).

A resolver is context-aware and thus knows everything about the IO of the api.

We added another abstraction (container) (also context-aware) to handle links between models and side effects.

This also makes it easier to test since you do not have to use a graphQL abstraction.

## Schema

A schema is a GraphQL abstraction. It represents both graphql type and resolver.

It is used as an helper in our module system to build the whole api schema.

## Types

Type definitions for GraphQL and Flow.

A GraphQL type is the core representation of our data.

It describes the exact shape of data, functions, inputs and outputs of our graphQL api.

# FAQ

1.  Why not writing container logic in resolver ?

A resolver is a GraphQL abstraction that deals with Graphql concepts like type resolvers, queries, mutations and subscriptions.

The container concept is just a methods wrapper and can be used in any other project like a REST api for instance.

It's a little boilerplate to add separation of concerns and makes it more flexible.
