[![Logo][kujang-logo]][kujang-url]

[![NPM version][npm-image]][npm-url] 

# Kujang Generator
API-first client generator to build Flutter Apps and others using OpenAPI 3.0 API definition (Swagger 3.0).

![Kujang Result][kujang-result]

## Prerequisite
- NodeJS
- Flutter

## Install
```bash
npm i -g generator-kujang
```

## Usage
```bash
yo kujang
```
![cli][kujang-cli]
![cli][kujang-cli-end]


```bash
cd toYourAppFolder
```
because this package use generated intl, which sometime you need to run 'fluter clean' then run.
```bash
flutter clean
flutter run
```

## Development

### Clone Kujang
```bash
git clone to/your/generator-kujang
```
### Link Kujang
```bash
npm link to/your/generator-kujang
```

### Unlink Kujang
```bash
npm unlink to/your/generator-kujang
```

[kujang-cli]: https://github.com/bhangun/repo-assets/blob/master/kujang/snapshot/kujang-cli.png
[kujang-cli-end]: https://github.com/bhangun/repo-assets/blob/master/kujang/snapshot/end-cli.png
[kujang-logo]: https://raw.githubusercontent.com/bhangun/repo-assets/master/kujang/logo/kujang.svg
[kujang-url]: https://www.npmjs.com/package/generator-kujang
[npm-url]: https://www.npmjs.com/package/generator-kujang
[npm-image]: https://badge.fury.io/js/generator-kujang.svg
[kujang-result]: https://github.com/bhangun/repo-assets/blob/master/kujang/snapshot/kujang-result.png

