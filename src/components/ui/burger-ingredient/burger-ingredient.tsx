import React, { FC, memo, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { useDispatch } from 'react-redux';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd, locationState }) => {
    const { image, price, name, _id, type } = ingredient;
    return (
      <li
        className={styles.container}
        data-testid={`burger-item-${type}-${_id}`}
      >
        <div data-testid={`ingredient-${_id}`}>
          <NavLink
            className={styles.article}
            to={`/ingredients/${_id}`}
            state={locationState}
          >
            {count && <Counter count={count} />}
            <img
              className={styles.img}
              src={image}
              data-testid='ingedient-image'
              alt='картинка ингредиента.'
            />
            <div className={`${styles.cost} mt-2 mb-2`}>
              <p
                className='text text_type_digits-default mr-2'
                data-testid='ingedient-price'
              >
                {price}
              </p>
              <CurrencyIcon type='primary' />
            </div>
            <p
              className={`text text_type_main-default ${styles.text}`}
              data-testid='ingedient-name'
            >
              {name}
            </p>
          </NavLink>
        </div>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
