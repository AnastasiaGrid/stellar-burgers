import { reqPath } from './utils';
import ingredientsMockData from '../fixtures/ingredients.json';
import orderMockData from '../fixtures/order-success-true.json';
import { afterAll } from '@jest/globals';

const testId = (id: string) => `[data-testid="${id}"]`;

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:5173', function () {
    cy.visit('http://localhost:5173');
  });
});

describe('проверяем добавление ингредиентов в конструктор', () => {
  it('данные с сервера соответствуют разметке', () => {
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
  it('клик по кнопке "Добавить" должен добавлять булку в конструктор', () => {
    const liSelector = testId('burger-item-bun-1');
    const bunFirst = ingredientsMockData.data[0];
    const bunSecond = ingredientsMockData.data[7];
    //клик по кнопке добавить
    cy.get(`${liSelector} button`).click();
    //проверка что вставляется в конструктор именно то на что мы нажали
    cy.get(
      `${testId('burger-constructor-element-top')} .constructor-element__text`
    ).should('have.text', `${bunFirst.name} (верх)`);
    cy.get(
      `${testId('burger-constructor-element-bottom')} .constructor-element__text`
    ).should('have.text', `${bunFirst.name} (низ)`);
    //проверяем каунтер
    cy.get('.counter__num').should('have.text', `2`);
    //проверяем что при нажатии на другую булку в конструкторе заменяется
    cy.get(`${testId('burger-item-bun-5')} button`).click();
    cy.get(
      `${testId('burger-constructor-element-top')} .constructor-element__text`
    ).should('have.text', `${bunSecond.name} (верх)`);
    cy.get(
      `${testId('burger-constructor-element-bottom')} .constructor-element__text`
    ).should('have.text', `${bunSecond.name} (низ)`);
    //проверяем каунтер
    cy.get('.counter__num').should('have.text', `2`);
  });
  it('клик по кнопке "Добавить" должен добавлять соус или начинку в конструктор', () => {
    //для упрощения, чтобы сразу для первой булки
    const liSelector = testId('burger-item-main-2');
    const { name, price, image } = ingredientsMockData.data[1];
    //клик по кнопке добавить
    cy.get(`${liSelector} button`).click();
    // проверка что вставляется в конструктор именно то на что мы нажали
    cy.get(
      `${testId('burger-constructor-element-2')} .constructor-element__text`
    ).should('have.text', `${name}`);
    cy.get(
      `${testId('burger-constructor-element-2')} .constructor-element__text`
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
  it('при клике на ингредиент должно открываться модальное окно', () => {
    cy.get(`${testId('ingredient-1')}`).click();
    cy.get(`${testId('modal')}`).should('be.visible');
  });
  it('при клике на крестик должно закрываться модальное окно', () => {
    cy.get(`${testId('ingredient-1')}`).click();
    cy.get(`${testId('modal')}`).should('be.visible');
    cy.get(`${testId('modal')} button`).click();
    cy.get(`${testId('modal')}`).should('not.exist');
  });
  it('при клике на оверлей должно закрываться модальное окно', () => {
    cy.get(`${testId('ingredient-1')}`).click();
    cy.get(`${testId('modal')}`).should('be.visible');
    cy.get(`${testId('modal-overlay')}`).click({ force: true });
    cy.get(`${testId('modal')}`).should('not.exist');
  });
  it('при клике на ESC должно закрываться модальное окно', () => {
    cy.get(`${testId('ingredient-1')}`).click();
    cy.get(`${testId('modal')}`).should('be.visible');
    cy.get('body').type('{esc}');
    cy.get(`${testId('modal')}`).should('not.exist');
  });
});

describe('подстановка токена', () => {
  it('куки должен корректно добавляется в запрос пользователя', () => {
    cy.setCookie('accessToken', 'my_token');
    cy.intercept('GET', reqPath('/auth/user'), {
      fixture: 'user-success-true.json'
    }).as('getUser');
    cy.visit('/');
    cy.wait('@getUser')
      .its('request.headers')
      .should('have.property', 'authorization', 'my_token');
  });
});
describe('сборка бургера', () => {
  beforeEach(() => {
    cy.get(`${testId('burger-item-bun-1')} button`).click();
    cy.get(`${testId('burger-item-main-2')} button`).click();
  });
  it('клик по корзинке должен удалять начинку или соус из конструктора', () => {
    cy.get(
      `${testId('burger-constructor-element-2')} .constructor-element__action`
    ).click();
    cy.get(`${testId('burger-constructor-element-2')}`).should('not.exist');
  });
  it('корректно отображается сумма заказа', () => {
    cy.get(testId('constructor-price')).contains(
      `${ingredientsMockData.data[0].price * 2 + ingredientsMockData.data[1].price}`
    );
  });
});
describe('проверка что модалка не открывается без авторизации и сборки бургера', () => {
  it('клик по "Оформить заказ" без авторизации и сборки бургера не вызывает модальное окно', () => {
    cy.get(`${testId('burger-constructor-submit')} button`).click();
    cy.get(`${testId('modal')}`).should('not.exist');
  });
});
describe('проверка процесса оформления заказа', () => {
  beforeEach(() => {
    //авторизируемся
    cy.intercept('GET', reqPath('/auth/user'), {
      fixture: 'user-success-true.json'
    }).as('getUser');
    cy.visit('/');
    cy.wait('@getUser');
    //устанавливаем куки и localStorage
    cy.setCookie('accessToken', 'my_token');
    window.localStorage.setItem('refreshToken', 'my_refresh_token');
  });
  it('клик по "Оформить заказ" открывает модальное окно в корректной форме и клик на крестик закрывает модальное окно и очищает конструктор', () => {
    //добавляем в конструткор ингредиенты
    cy.get(`${testId('burger-item-bun-1')} button`).click();
    //открывает модалку
    cy.get(`${testId('burger-constructor-submit')} button`).click();
    cy.get(`${testId('modal')}`).should('exist');
    //проверяем наличие лоадера
    cy.get(`${testId('preloader')}`).should('exist');
    //отправляем на сервер данные по заказу
    cy.intercept('POST', reqPath('orders'), {
      fixture: 'order-success-true.json'
    }).as('orders');
    //проверяем что нажатие на крестик во время лоадинга не закрывает модалку
    cy.get(`${testId('modal-close-button')}`).click();
    cy.get(`${testId('modal')}`).should('exist');
    //ответ
    cy.wait('@orders');
    // //проверяем что прелоадера нет
    cy.get(`${testId('preloader')}`).should('not.exist');
    //проверяем что номер заказа как в ответе с сервера
    cy.get(`${testId('modal-order-number')}`).should(
      'have.text',
      `${orderMockData.order.number}`
    );
    //проверяем закрытие модалки
    cy.get(`${testId('modal-close-button')}`).click();
    cy.get(`${testId('modal')}`).should('not.exist');
    //проверяем очистку конструктора
    cy.get(`${testId('burger-constructor-element-1')}`).should('not.exist');
    cy.get(testId('constructor-price')).contains('0');
  });
  after(() => {
    //удаляем куки и localStorage
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });
});
