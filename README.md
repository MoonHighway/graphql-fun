# GraphQL Fun

The arrival of [GraphQL](http://www.graphql.org) marks a tectonic shift in the way that APIs are designed and will be designed for many years to come. It's useful to talk about all of GraphQL's serious implications for how we fetch data in our applications, but let's not forget that GraphQL is really fun.

This app demonstrates the core concepts of GraphQL with two fun, interactive activities:

TODO: Extend Example Apps

- **Color Groups**: Break up an audience of any size into different groups, assigning each person a color. 🎨
- **WeJay**: Pick audience members at random to play a song together. 🎹

## Have Questions?

Email [Eve Porcello](mailto:eve@moonhighway.com).

## Want to learn more about GraphQL?

Check out [GraphQL Workshop](https://www.graphqlworkshop.com).

---

### Saved Board Queries

```graphql
query boardStatus {
  callout {
    name
    state
    ... on AudiencePoll {
      results {
        question
        yesLabel
        noLabel
        yes
        no
      }
    }
  }
}

mutation start {
  startAudiencePoll(
    question: "how much is that"
    yesLabel: "a lot"
    noLabel: "not a lot"
  ) {
    yes
    no
  }
}
```
