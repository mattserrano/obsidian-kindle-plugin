import { SyncingStateKey } from "~/models";

export function getBaseContent(useObsidianProperties: boolean): string {
  const filter = useObsidianProperties
    ? `file.hasTag("${SyncingStateKey}")`
    : `file.hasProperty("${SyncingStateKey}")`;

  return `
---
properties:
  title:
    displayName: title
  note.highlightsCount:
    displayName: highlights
  note.lastAnnotatedDate:
    displayName: last annotated
  note.authorUrl:
    displayName: author url
  note.asin:
    displayName: asin
  note.isbn:
    displayName: isbn
  note.bookImageUrl:
    displayName: book image url
views:
  - type: cards
    name: Books
    filters:
      and:
        - ${filter}
    order:
      - title
      - author
      - asin
      - lastAnnotatedDate
      - highlightsCount
    image: bookImageUrl
    cardSize: 150
    imageAspectRatio: 1.5
`;
}
