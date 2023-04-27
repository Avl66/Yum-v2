import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCard from './MenuCard';

//import {itemContext} from '../App';
var store = require('store');

function RestaurantMenu() {
  // const [items, setitems] = useState(store.get("items") ?? []);
  // const [loading, setLoading] = useState(store.get("loading") ?? true);
  // const [error, setError] = useState(store.get("error") ?? "");

  const [items, setitems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    //https://my-json-yumito-server.herokuapp.com/menu
    //console.log("Restaurant menu rendered");
    if (items.length === 0) {
      axios
        .get(
          'https://food-items-server-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
        )
        .then((response) => {
          let res = response.data;
          let mealsArr = [];

          for (const key in res) {
            mealsArr.push({
              id: key,
              category: res[key].category,
              items: res[key].items,
            });
          }
          for (let k of mealsArr) {
            let itemsArr = [],
              response = k.items;
            for (let key in response) {
              itemsArr.push({
                id: key,
                itemName: response[key].itemName,
                description: response[key].description,
                img: response[key].img,
                tag: response[key].tag,
                price: response[key].price,
                vegan: response[key].vegan,
              });
            }
            console.log(k.items, 'items');
            k.items = itemsArr;
          }

          // store.set("error", "");
          // store.set("loading", false);
          // store.set("items", mealsArr);
          setLoading(false);
          setError('');
          setitems(mealsArr);
        })
        .catch((e) => {
          // store.set("loading", false);
          // store.set("error", e.message);
          setError(e.message);
        });
    }
  }, [items]);

  const loadedItems =
    items?.map((item) => (
      <div key={item.id} className="container d-flex flex-column">
        <div className="h3 tt" id={item.category}>
          {item.category}
        </div>
        <div className="menuCardWrapper d-flex flex-wrap">
          {item.items &&
            item.items.map((i) => <MenuCard data={i} key={i.id} />)}
        </div>
      </div>
    )) ?? [];

  const Spinner = (
    <div className="spinnerBlock d-flex justify-content-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <>
      {error !== '' && (
        <h2 className="text-center text-danger border border-dark p-2 position-absolute top-50 start-50 translate-middle">{`${error}. Please try after sometime`}</h2>
      )}
      {loading === false && error === '' && (
        <div className="container-fluid menuLayout">{items && loadedItems}</div>
      )}
      {loading === true && Spinner}
    </>
  );
}

export default React.memo(RestaurantMenu);
