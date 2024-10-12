import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState } from 'src/services/store';
import { useSelector } from 'react-redux';
import { selectIngredients } from '../../slices/ingredientsSlice';
import { useLocation, useParams } from 'react-router-dom';
import { log } from 'console';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const { id } = useParams<{ id: string }>();
  const ingredientData = ingredients.find((item) => item._id === id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
