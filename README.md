# local-import-intellisense README

A VSCode extension (in the making) to make local imports in large projects easier.

Note that almost everything in this repo is based on the excellent work of Christian Kohler's more or less essential extension [NpmIntellisense](https://github.com/ChristianKohler/NpmIntellisense). Go say thank you.

## To use (Basic)

For the moment we're in the very early stages. Download or clone the repo, install any dependencies using `yarn install`, open the project in VSCode and spin up a demo using `CMD + F5`

## Features

`// TODO: write features 👀`

### Command: Insert Import Statement

`CMD+SHIFT+P` then type "Insert Import Statement" and hit `Enter`. A quickPick dialog will pop up to help you out!

### Intellisense

Type a standard Import statement in a javascript or typescript file. When you get to the quotes, the intellisense will come to life !

## Requirements

`// TODO: write requirements. Can you extend extensions? In that case, this might be better as an extension to NpmIntellisense, honestly.`

## Extension Settings / Configuration

`// TODO: write about extension settings`

| Config Property       | Type      | Default                               | Description                                                                                           |
| --------------------- | --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| importES6             | boolean   | `true`                                | For import command. Use import statements instead of require()                                        |
| importQuotes          | string    | `"'"` (single quote)                  | For import command. The type of quotes to use in the snippet                                          |
| importLinebreak       | string    | `";\r\n"`                             | For import command. The linebreak used after the snippet                                              |
| importDeclarationType | string    | `"const"`                             | For import command. The declaration type used for require()                                           |
| languageSelectors     | Array<{}> | _see below_                           | In what kind of files should local import intellisense do its magic ?                                 |
| importMatch           | string    | `"**/*.{js,ts,css,scss,svg,jpg,png}"` | What is the GlobPattern that local import intellisense should use to find local files to import from? |
| importIgnore          | string    | `"**/node_modules/**"`                | What is the GlobPattern that local import intellisense should use to ignore imports?                  |

### languageSelectors default value

The default value of languageSelectors is as follows. Note that we are using the sheme and language properties.

```
[
  {
    "scheme": "file",
    "language": "javascript"
  },
  {
    "scheme": "file",
    "language": "javascriptreact"
  },
  {
    "scheme": "file",
    "language": "typescript"
  },
  {
    "scheme": "file",
    "language": "typescriptreact"
  }
]
```

`// TODO: Explain why we do this`

## Known Issues

None! because I haven't written any unit tests, and no one has ever used this.

`// TODO: write unit tests`

## Release Notes

...still in the early stages: no releases yet 😄
