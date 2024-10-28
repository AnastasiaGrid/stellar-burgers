export const reqPath = (url: string) =>
  `${Cypress.env('BURGER_API_URL')}/${url}`;
