import React, { useState, useEffect, useRef } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  deleteDoc,
  arrayUnion,
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../../../firebaseAuthConfig";
import "./ShoppingList.scss";
import "../../../../App.css";
import Expand from "../../../../Assets/images/more.png";
import Shrink from "../../../../Assets/images/shrink.png";
import Remove from "../../../../Assets/images/trash.png";
import Add from "../../../../Assets/images/add.png";
import ClientHeader from "../../ClientHeader/ClientHeader";
import ClientFooter from "../../ClientFooter/ClientFooter";
import ShoppingListItem from "../../ShoppingListItem/ShoppingListItem";

const ShoppingList = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  let user = JSON.parse(sessionStorage.getItem("user")).accountRef;
  let listRef = useRef();

  const getShoppingList = async () => {
    let docRef = doc(db, "accounts", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) {
      return docSnap.data();
    }
  };

  const getShoppingListItems = async (id) => {
    let docRef = doc(db, "shopping-lists", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) {
      return { data: docSnap.data(), id: docSnap.id };
    }
  };

  const setShoppingListItems = async () => {
    let shoppingListsRez = await getShoppingList();
    let lists = [];

    let listReqs = shoppingListsRez.shopping_list.map(async (list) => {
      return await getShoppingListItems(list);
    });

    const data = await Promise.all(listReqs);
    data.forEach((res) => {
      lists.push(res);
    });
    setShoppingLists(lists);
  };

  function revisedRandId() {
    let id = `prefix${Math.random().toString(36).substring(2)}`;
    return id;
  }

  const expandList = (id) => {
    document
      .querySelector(`#${id} .shopping__list__content`)
      .classList.remove("hide");
    document
      .querySelector(`#${id} .shopping__list__shrink`)
      .classList.remove("hide");

    document
      .querySelector(`#${id} .shopping__list__expand`)
      .classList.add("hide");

    document
      .querySelector(`#${id} .shopping__list__add__item`)
      .classList.remove("hide");
  };

  const shrinkList = (id) => {
    document
      .querySelector(`#${id} .shopping__list__content`)
      .classList.add("hide");
    document
      .querySelector(`#${id} .shopping__list__shrink`)
      .classList.add("hide");
    document
      .querySelector(`#${id} .shopping__list__expand`)
      .classList.remove("hide");

    document
      .querySelector(`#${id} .shopping__list__add__item`)
      .classList.add("hide");
  };

  const deleteItemFromShoppingList = async (listItem, listId) => {
    const shoppingListRef = doc(db, "shopping-lists", listId);
    await updateDoc(shoppingListRef, {
      list_items: arrayRemove(listItem),
    });

    setShoppingListItems();
  };

  const deleteShoppingList = async (listId) => {
    let accountRef = doc(db, "accounts", user);
    let shoppingListRef = doc(db, "shopping-lists", listId);
    await updateDoc(accountRef, {
      shopping_list: arrayRemove(listId),
    });
    await deleteDoc(shoppingListRef);
    setShoppingListItems();
  };

  const addNewListItem = async (id, listId) => {
    let itemValue = document.querySelector(`#input${id}`).value;

    if (itemValue !== null && itemValue.length > 0 && itemValue !== " ") {
      const shoppingListRef = doc(db, "shopping-lists", listId);
      await updateDoc(shoppingListRef, {
        list_items: arrayUnion({ name: itemValue, checked: false }),
      });
      await setShoppingListItems();
      document.querySelector(`#input${id}`).value = "";
    }
  };

  const addNewList = async (userId) => {
    if (
      listRef.current.value !== null &&
      listRef.current.value.length > 0 &&
      listRef.current.value !== " "
    ) {
      let data = {
        list_items: [],
        list_title: listRef.current.value,
      };
      const listRefDoc = await addDoc(collection(db, "shopping-lists"), data);
      const accountRef = doc(db, "accounts", userId);
      let accountRez = await updateDoc(accountRef, {
        shopping_list: arrayUnion(listRefDoc.id),
      });
      await setShoppingListItems();
      listRef.current.value = "";
    }
  };

  const changeCheckedValue = async (listItem, listId, itemId) => {
    //remove initial object
    const shoppingListRef = doc(db, "shopping-lists", listId);
    await updateDoc(shoppingListRef, {
      list_items: arrayRemove(listItem),
    });

    await updateDoc(shoppingListRef, {
      list_items: arrayUnion({
        name: listItem.name,
        checked: !listItem.checked,
      }),
    });
    setShoppingListItems();
  };

  useEffect(() => {
    setShoppingListItems();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shopping__list__page">
      <ClientHeader />

      <div className="shopping__list__container__page__container">
        {shoppingLists.length > 1 ? (
          <h3>Your Shopping Lists</h3>
        ) : (
          <h3>Your Shopping List</h3>
        )}
        <div className="shopping__list__container__page__content">
          <div className="shopping__list__add__container">
            <p>Create new shopping list</p>
            <div className="shopping__list__add__list">
              <input
                type="text"
                ref={listRef}
                className=""
                placeholder="E.g.: Shopping 12.10"
              />
              <div
                className="shopping__list__add__action"
                onClick={() => addNewList(user)}
              >
                <img src={Add} alt="Add List" />
              </div>
            </div>
          </div>
          {shoppingLists.map((item) => {
            let id = revisedRandId();
            return (
              <div
                className="shopping__list__container"
                id={`${id}`}
                key={item.id}
              >
                <div className="shopping__list__headline">
                  <p className="shopping__list__title">
                    {item.data.list_title}
                  </p>
                  <div className="shopping__list__headline__date__and__action">
                    <div
                      className="shopping__list__expand"
                      onClick={() => expandList(id)}
                    >
                      <img src={Expand} alt="Expand" />
                    </div>
                    <div
                      className="shopping__list__shrink hide"
                      onClick={() => shrinkList(id)}
                    >
                      <img src={Shrink} alt="Shrink" />
                    </div>
                    <div
                      className="shopping__list_remove"
                      onClick={() => deleteShoppingList(item.id)}
                    >
                      <img src={Remove} alt="Remove Item" />
                    </div>
                  </div>
                </div>
                <div className="shopping__list__add__item hide">
                  <p className="shopping__list__add__item__headline">
                    Add new item on your shopping list
                  </p>
                  <div className="shopping__list__add__item__action__zone">
                    <input
                      type="text"
                      id={`input${id}`}
                      className=""
                      placeholder="E.g.: Apples"
                      key={item.id}
                    />
                    <div
                      className="shopping__list__add__button"
                      onClick={() => {
                        addNewListItem(id, item.id);
                      }}
                    >
                      <img src={Add} alt="Add Item" />
                    </div>
                  </div>
                </div>
                <div className="shopping__list__content hide">
                  {item.data.list_items.map((listItem) => {
                    let trimmedName = listItem.name.split(" ").join("");
                    let itemId = "prefix" + trimmedName;
                    return (
                      <ShoppingListItem
                        key={itemId}
                        title={listItem.name}
                        checkedInitialValue={listItem.checked}
                        deleteAction={() =>
                          deleteItemFromShoppingList(listItem, item.id)
                        }
                        updateCheck={() =>
                          changeCheckedValue(listItem, item.id, itemId)
                        }
                        itemId={itemId}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ClientFooter />
    </div>
  );
};

export default ShoppingList;
