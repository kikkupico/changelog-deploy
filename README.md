# changelog

## changelog.json

Schema of `changelog.json` files would look like this

```js
{
  "release_date": "",
  "type": "update / stable release / pre release / patch release",
  "changelogs": [
    {
      //.... changlog entry 1
    },
    {
      //.... changlog entry 2
    }
  ]
}
```

Each changelog entry object would look like

```js
{
  "component": "", // could be either one of "server", "cli", "console", "build"
  "type": "", // could be either one of "bug-fix", "feature", "performance-fix"
  "short_description": "", // valid markdown string
  "long_description": "", // valid markdown string
}
```