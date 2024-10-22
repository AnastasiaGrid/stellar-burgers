import { reqPath } from './utils';
import { ConstructorPage } from '@pages';
import ingredientsMockData from '../fixtures/ingredients.json';

const testId = (id: string) => `[data-testid="${id}"]`;

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:5173', function () {
    cy.visit('http://localhost:5173');
  });
});

describe('добавление ингредиентов в конструктор', () => {
  it('данные с сервера соответсвуют разметке', () => {
    //для упрощения, чтобы сразу для первой булки
    const liSelector = testId('burger-item-bun-1');
    const { name, price, image } = ingredientsMockData.data[0];
    cy.get(`${liSelector}`).should('be.visible');
    cy.get(`${liSelector} button`).should('be.visible'); // 1
    //проверка на то, что данные правильно вставляются в разметку
    cy.get(`${liSelector} ${testId('ingedient-price')}`).should(
      'have.text',
      price
    );
    cy.get(`${liSelector} ${testId('ingedient-name')}`).should(
      'have.text',
      name
    );
    cy.get(`${liSelector} ${testId('ingedient-image')}`).should(
      'have.attr',
      'src',
      image
    );
  });
  it('нажатие на кнопку добавить на ингредиенте булка', () => {
    const liSelector = testId('burger-item-bun-1');
    const { name, price, image } = ingredientsMockData.data[0];
    //клик по кнопке добавить
    cy.get(`${liSelector} button`).click();
    //проверка что вставляется в конструктор именно то на что мы нажали
    cy.get(
      `${testId('burger-constructor-element-top')} .constructor-element__text`
    ).should('have.text', `${name} (верх)`);
    cy.get(
      `${testId('burger-constructor-element-bottom')} .constructor-element__text`
    ).should('have.text', `${name} (низ)`);
    //проверяем каунтер
    cy.get('.counter__num').should('have.text', `2`);
  });
  it('нажатие на кнопку добавить на ингредиенте начинка', () => {
    //для упрощения, чтобы сразу для первой булки
    const liSelector = testId('burger-item-main-2');
    const { name, price, image } = ingredientsMockData.data[1];
    //клик по кнопке добавить
    cy.get(`${liSelector} button`).click();
    // проверка что вставляется в конструктор именно то на что мы нажали
    cy.get(
      `${testId('burger-constructor-element')} .constructor-element__text`
    ).should('have.text', `${name}`);
    cy.get(
      `${testId('burger-constructor-element')} .constructor-element__text`
    ).should('have.text', `${name}`);
    //проверяем каунтер
    cy.get('.counter__num').should('have.text', `1`);
    //клик по кнопке добавить
    cy.get(`${liSelector} button`).click();
    //проверяем каунтер еще раз
    cy.get('.counter__num').should('have.text', `2`);
  });
});
describe('работа модального окна', () => {
  it('открытие модального окна', () => {
    cy.get('[data-testid="ingedient-1"]');
    // cy.get('[data-test-id="modal-ingredient"]');
  });
});
