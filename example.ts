import Krypton86 from './dist/src/krypton86';

const client = new Krypton86('sk_live_3qw6anaqsyBEFqMnN0aXa4lEYjG30cH6', {
  apiHostname: 'localhost',
  port: 7000,
  https: false,
});

(async () => {
  try {
    await client.incrUnit(
      'clubhouse',
      'user',
      {
        number: 420,
        'a value': 'skdiddy-blat',
        'true?': false,
      },
      10,
    );
  } catch (error) {
    console.error(error);
  }
})();
