# krypton86

A client for [krytpon86.com](https://krytpon86.com)

## Installation

You can install the krypton86 client in your local environment by running:

```
yarn add krytpon86
```

## Configuration

To use the client you must provide an API key located from the krypton86 dashboard either as an environment variable `KRYPTON86_API_KEY`:

```sh
KRYPTON86_API_KEY="sk_live_1234" ./app
```

Or you can set it on your own before your application starts:

```ts
import Krypton86 from "krypton86";

const client = new Krypton86("sk_live_1234");
```

## Usage

### Incrementing a unit

```ts
const props = {
  loggedIn: false,
  room: "website",
  project: "ibm"
};

await client.incrUnit("customerRef", "User", props);
```

You can provide an optional `amount` parameter:

```ts
const props = {
  loggedIn: false,
  room: "website",
  project: "ibm"
};

await client.incrUnit("customerRef", "User", props, 1000);
```

If a customer associated with the customer ref does not exist, one will be created. You can manage customer's in the [dashboard](https://krypton86.com).
