[![Build Status](https://travis-ci.org/telemark/micro-tmp-storage.svg?branch=master)](https://travis-ci.org/telemark/micro-tmp-storage)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-tmp-storage

Microservice for storing key/value data temporarily.

Default ttl is 60 seconds

## API

### POST

**value** value to store
**ttl** ttl in seconds (optional, defaults to 60)

```bash
$ curl -d '{"value": "My secret, temporary value", "ttl": "30"}' https://tmp.storage.t-fk.win
```

returns

```JavaScript
{
  key: 'b72545e8-6b58-4672-ad87-4096bb9da778',
  value: 'My secret, temporary value',
  ttl: 30,
  success: true
}
```

### GET

#### ```/storage/{key}``` or ```/{key}```

```bash
$ curl https://tmp.storage.win/storage/b72545e8-6b58-4672-ad87-4096bb9da778
```

returns 200 ok on success

```JavaScript
{
  key: 'b72545e8-6b58-4672-ad87-4096bb9da778',
  value: 'My secret, temporary value'
}
```

returns 404 not found on failure

```JavaScript
{
  key: 'b72545e8-6b58-4672-ad87-4096bb9da778',
  value: false
}
```

## Code

[GitHub](https://github.com/telemark/micro-tmp-storage)

## License

[MIT](LICENSE)
