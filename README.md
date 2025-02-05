This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

### env variables

- For local development add your base URL to a `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Then, run the development server:

```bash
pnpm dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO

- [ ] Add a section displaying all customers with their total points and transaction count.
- [ ] Add query filters to the URL
- [ ] Add unit tests
- [ ] Add Download CSV feature
- [ ] Add sort buttons for all columns
- [ ] use zod for validation
- [ ] use localstorage to remember user preferences for Table queries
- [ ] handle no data on charts
