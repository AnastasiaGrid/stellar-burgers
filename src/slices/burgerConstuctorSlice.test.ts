import burgerConstructorReducer, {
  addConstructorItem,
  changeIndexDown,
  changeIndexUp,
  deleteConstructorItems,
  deleteIngredients
} from './burgerConstuctorSlice';

describe('[addConstructorItem] тестирование экшена добавления в конструктор', () => {
  const InitialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };
  test('добавляется булка в конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      addConstructorItem({
        _id: '1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: 'testId-1'
      })
    );
    const { bun } = newState.constructorItems;
    expect(bun).toEqual({
      _id: '1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: 'testId-1'
    });
  });
  test('добавляется ингредиент в конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      addConstructorItem({
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'testId-2'
      })
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([
      {
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'testId-2'
      }
    ]);
  });
});
describe('[deleteIngredients & deleteConstructorItems]тестирование экшенов удаления из конструктора', () => {
  const InitialState = {
    constructorItems: {
      bun: {
        _id: '1',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: 'testId-1'
      },
      ingredients: [
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: 'testId-2'
        }
      ]
    }
  };
  test('[deleteIngredients] удаляется начинки из конструктора', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      deleteIngredients({
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      })
    );
    const { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([]);
  });
  test('[deleteConstructorItems] очищается конструктор', () => {
    const newState = burgerConstructorReducer(
      InitialState,
      deleteConstructorItems()
    );
    expect(newState).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      }
    });
  });
});
describe('[changeIndexUp & changeIndexDown] тестирование экшена изменения порядка ингредиента в конструкторе', () => {
  const InitialState = {
    constructorItems: {
      bun: null,
      ingredients: [
        {
          _id: '2',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          id: 'testId-2'
        },
        {
          _id: '3',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          id: 'testId-3'
        },
        {
          _id: '4',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          id: 'testId-4'
        }
      ]
    }
  };
  test('[changeIndexUp] ингредиент в конструкторе должен переместиться выше на 1 строку', () => {
    const newState = burgerConstructorReducer(InitialState, changeIndexUp(1));
    expect(newState.constructorItems.ingredients).toEqual([
      {
        _id: '3',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'testId-3'
      },
      {
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'testId-2'
      },
      {
        _id: '4',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: 'testId-4'
      }
    ]);
  });
  test('[changeIndexDown] ингредиент в конструкторе должен переместиться ниже на 1 строку', () => {
    const newState = burgerConstructorReducer(InitialState, changeIndexDown(1));
    expect(newState.constructorItems.ingredients).toEqual([
      {
        _id: '2',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.pn',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'testId-2'
      },
      {
        _id: '4',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        id: 'testId-4'
      },
      {
        _id: '3',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'testId-3'
      }
    ]);
  });
});
