import { useEffect } from 'react';
import { useCatListContext } from '../model/context';

export const CatList = () => {
  const { catListStore } = useCatListContext();

  useEffect(() => {
    catListStore.getCats();
  }, []);

  return (
    <div>
      <h1>Cat list</h1>
      {catListStore.cats.map((item, key) => (
        <div key={key}>
          {item.name} {item.age} {item.breed}
        </div>
      ))}
    </div>
  );
};
