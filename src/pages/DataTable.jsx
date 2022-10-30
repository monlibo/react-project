/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import "./../styles/pages/DataTable.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function DataTable() {
  //Permet de modifier l'url
  let [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState(
    searchParams.get("query") ? searchParams.get("query") : ""
  );
  const [fieldSearch, setFieldSearch] = useState("name");
  const [criterion, setCriterion] = useState("equal");

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort-by") ? searchParams.get("sort-by") : "name"
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sort-order") ? searchParams.get("sort-order") : "asc"
  );

  const [selected, setSelected] = useState(new Array(15).fill(false));
  const [page, setPage] = useState(
    searchParams.get("page") ? parseInt(searchParams.get("page")) : 1
  );
  const [per, setPer] = useState(5);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [openAddForm, setOpenAddForm] = useState(false);

  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [dateError, setDateError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [idUpdate, setIdUpdate] = useState(0);
  const [openEditForm, setOpenEditForm] = useState(false);

  const [message, setMessage] = useState("");

  //Recupère les produits depuis l'API
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4000/products");
      const dataFecthed = await response.json();
      setProducts(dataFecthed);
    }

    fetchData();
    setLoading(false);
  }, []);

  const filterBy = (products) => {
    let productsArray;

    switch (sortBy) {
      case "id":
        productsArray = products.sort((a, b) => a.id - b.id);
        break;

      case "name":
        console.log(products);
        productsArray = products.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        break;
      case "price":
        productsArray = products.sort((a, b) => a.price - b.price);
        break;
      case "quantity":
        productsArray = products.sort((a, b) => a.quantity - b.quantity);
        break;

      case "date":
        productsArray = products.sort((a, b) => {
          const dateA = a.date.toUpperCase(); // ignore upper and lowercase
          const dateB = b.date.toUpperCase(); // ignore upper and lowercase
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        break;

      case "category":
        productsArray = products.sort((a, b) => {
          const categoryA = a.category.toUpperCase(); // ignore upper and lowercase
          const categoryB = b.category.toUpperCase(); // ignore upper and lowercase
          if (categoryA < categoryB) {
            return -1;
          }
          if (categoryA > categoryB) {
            return 1;
          }
          // names must be equal
          return 0;
        });

        break;
      default:
        break;
    }

    if (criterion === "equal") {
      switch (fieldSearch) {
        case "name":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase().includes(query.toLowerCase());
          });
          break;
        case "price":
          productsArray = productsArray.filter((product) => {
            return parseFloat(product.price) === parseFloat(query);
          });

          break;

        case "quantity":
          productsArray = productsArray.filter((product) => {
            return (
              parseFloat(product.quantity) === parseFloat(query.toLowerCase())
            );
          });
          break;

        case "date":
          productsArray = productsArray.filter((product) => {
            return product.date.toLowerCase() === query.toLowerCase();
          });
          break;

        case "category":
          productsArray = productsArray.filter((product) => {
            return product.category.toLowerCase().includes(query.toLowerCase());
          });
          break;
        default:
          break;
      }
    }

    if (criterion === "upper") {
      switch (fieldSearch) {
        case "name":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() > query.toLowerCase();
          });
          break;
        case "price":
          productsArray = productsArray.filter((product) => {
            return parseFloat(product.price) > parseFloat(query);
          });

          break;

        case "quantity":
          productsArray = productsArray.filter((product) => {
            return (
              parseFloat(product.quantity) > parseFloat(query.toLowerCase())
            );
          });
          break;

        case "date":
          productsArray = productsArray.filter((product) => {
            return product.date.toLowerCase() > query.toLowerCase();
          });
          break;

        case "category":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() > query.toLowerCase();
          });
          break;
        default:
          break;
      }
    }

    if (criterion === "lower") {
      switch (fieldSearch) {
        case "name":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() < query.toLowerCase();
          });
          break;
        case "price":
          productsArray = productsArray.filter((product) => {
            return parseFloat(product.price) < parseFloat(query);
          });

          break;

        case "quantity":
          productsArray = productsArray.filter((product) => {
            return (
              parseFloat(product.quantity) < parseFloat(query.toLowerCase())
            );
          });
          break;

        case "date":
          productsArray = productsArray.filter((product) => {
            return product.date.toLowerCase() < query.toLowerCase();
          });
          break;

        case "category":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() < query.toLowerCase();
          });
          break;
        default:
          break;
      }
    }

    if (criterion === "different") {
      switch (fieldSearch) {
        case "name":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() !== query.toLowerCase();
          });
          break;
        case "price":
          productsArray = productsArray.filter((product) => {
            return parseFloat(product.price) !== parseFloat(query);
          });
          break;

        case "quantity":
          productsArray = productsArray.filter((product) => {
            return (
              parseFloat(product.quantity) !== parseFloat(query.toLowerCase())
            );
          });
          break;

        case "date":
          productsArray = productsArray.filter((product) => {
            return product.date.toLowerCase() !== query.toLowerCase();
          });
          break;

        case "category":
          productsArray = productsArray.filter((product) => {
            return product.name.toLowerCase() !== query.toLowerCase();
          });
          break;
        default:
          break;
      }
    }

    return sortOrder === "asc" ? productsArray : productsArray.reverse();
  };

  //Mise à jour du triage
  const updateSort = (sortByA) => {
    if (sortByA === sortBy) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortBy(sortByA);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    setSearchParams({
      "sort-by": sortBy,
      "sort-order": sortOrder,
      page,
    });
  }, [page, sortBy, sortOrder]);

  useEffect(() => {
    let end = page * per;
    let start = end - per;

    setSliceStart(start);
    setSliceEnd(end);

    if (Number.isSafeInteger(products.length / per)) {
      setPageCount(products.length / per);
    } else {
      let number = Math.round(products.length / per);

      if (number * per >= products.length) {
        setPageCount(number);
      } else {
        setPageCount(number + 1);
      }
    }
  }, [products, page, per]);

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  const handleQuery = (value) => {
    setQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  const updateSelected = (position) => {
    let newRow = selected.map((item, index) =>
      index === position ? !item : item
    );
    setSelected([...newRow]);
  };

  const fillAll = (checked) => {
    let newRow;
    checked
      ? (newRow = new Array(15).fill(true))
      : (newRow = new Array(15).fill(false));
    setSelected(newRow);
    console.log(selected);
  };

  const add = (e) => {
    let id = products
      .sort((a, b) => a.id - b.id)
      .reverse()
      .slice(0, 1)[0].id;
    let name = e.target.elements["name"].value;
    let price = e.target.elements["price"].value;
    let quantity = e.target.elements["quantity"].value;
    let date = e.target.elements["date"].value;
    let category = e.target.elements["category"].value;

    name === "" ? setNameError("Nom invalide") : setNameError("");
    price < 1 ? setPriceError("Prix invalide") : setPriceError("");
    quantity < 0 || quantity.length === 0
      ? setQuantityError("Quantité invalide")
      : setQuantityError("");
    date.length === 0 ? setDateError("Date invalide") : setDateError("");
    category === "" ? setCategoryError("Nom invalide") : setCategoryError("");

    if (
      name !== "" &&
      price > 1 &&
      (quantity > 0 || quantity.length !== 0) &&
      date.length !== 0 &&
      category !== ""
    ) {
      setProducts([
        ...products,
        { id: id + 1, name, price, quantity, date, category },
      ]);

      setNameError("");
      setPriceError("");
      setQuantityError("");
      setDateError("");
      setCategoryError("");
      setOpenAddForm(false);

      setMessage("Produit ajouté avec succès");
    }
  };

  const deleteProduct = (id) => {
    let index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
    setProducts([...products]);
    selected[id - 1] = false;
    setSelected([...selected]);

    setMessage("Produit supprimé avec succès");
  };

  const deleteSelection = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Etes vous sur de vouloir supprimer ces produits ?")) {
      for (let i = 0; i < selected.length; i++) {
        if (selected[i] === true) {
          let index = products.findIndex((product) => product.id === i + 1);
          index !== -1 && deleteProduct(products[index].id);
          selected[i] = false;
          setSelected([...selected]);
          setMessage("Produits supprimés avec succès");
        }
      }
    }
  };

  const edit = (idUpdate) => {
    let index = products.findIndex((product) => product.id === idUpdate);
    setIdUpdate(idUpdate);
    setOpenEditForm(true);
  };

  const updateProduct = (e) => {
    let id = e.target.elements["id"].value;
    let name = e.target.elements["name"].value;
    let price = e.target.elements["price"].value;
    let quantity = e.target.elements["quantity"].value;
    let date = e.target.elements["date"].value;
    let category = e.target.elements["category"].value;

    id === "" ? setNameError("Id invalide") : setIdError("");
    name === "" ? setNameError("Nom invalide") : setNameError("");
    price < 1 ? setPriceError("Prix invalide") : setPriceError("");
    quantity < 0 || quantity.length === 0
      ? setQuantityError("Quantité invalide")
      : setQuantityError("");
    date.length === 0 ? setDateError("Date invalide") : setDateError("");
    category === "" ? setCategoryError("Nom invalide") : setCategoryError("");

    if (
      id !== "" &&
      name !== "" &&
      price > 1 &&
      (quantity > 0 || quantity.length !== 0) &&
      date.length !== 0 &&
      category !== ""
    ) {
      let index = products.findIndex((product) => product.id === idUpdate);
      products[index] = { id, name, price, quantity, date, category };
      setProducts([...products]);

      setNameError("");
      setPriceError("");
      setQuantityError("");
      setDateError("");
      setCategoryError("");
      setIdUpdate(0);
      setOpenEditForm(false);
      setMessage("Produit mis à jour avec succès");
    }
  };

  return (
    <div className="flex flex-col px-4 space-y-4">
      <div className="w-full h-[50px] flex items-center justify-between mt-4">
        <span className="text-[20px] lg:text-[30px] font-bold text-blue-600">
          DataTable
        </span>
        <button
          onClick={() => setOpenAddForm(true)}
          className="px-3 py-1 bg-blue-500 rounded-md text-gray-50"
          disabled={openAddForm === true ? true : false}
        >
          Add new product
        </button>
      </div>

      <div className="flex flex-col items-start justify-start w-full py-3 space-y-4 lg:flex-row lg:items-end lg:justify-between">
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="grid w-full grid-cols-2 gap-y-4 gap-x-2 md:max-w-[500px] lg:grid-cols-3 lg:max-w-[60%]"
        >
          <div className="flex flex-col items-start">
            <label htmlFor="fieldSearch" className="w-full">
              Filter where :{" "}
            </label>
            <select
              onChange={(e) => setFieldSearch(e.target.value)}
              name="fieldSearch"
              id="fieldSearch"
              className={
                " text-[13px] h-[30px] w-full border border-gray-400 text-gray-500 outline-blue-500 rounded-md font-semibold"
              }
            >
              <option value="name"> Name</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity </option>
              <option value="date">Date</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="criteron" className="w-full">
              is :{" "}
            </label>
            <select
              onChange={(e) => setCriterion(e.target.value)}
              name="criterion"
              id="criterion"
              className={
                " text-[13px] h-[30px] w-full border border-gray-400 text-gray-500 rounded-md font-semibold"
              }
            >
              <option value="equal"> {"=="} equal </option>
              <option value="upper">{">"} upper </option>
              <option value="lower">{"<"} lower </option>
              <option value="different">{"<>"} different </option>
            </select>
          </div>

          <div className="flex flex-col items-start col-span-2 lg:col-span-1">
            <label htmlFor="query" className="w-full">
              to :{" "}
            </label>
            <input
              type="text"
              name="query"
              id="query"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder="Filtrer..."
              autoComplete="none"
              className="px-4 text-[13px] h-[30px] w-full border border-gray-400 text-gray-500 rounded-md font-semibold"
            />
          </div>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (e.target[0].value < 0) {
              alert(
                "Le nombre d'éléments par page ne peut pas être inférieure ou égale à 0"
              );
            } else {
              if (e.target[0].value > products.length) {
                alert(
                  "Le nombre d'éléments par page ne peut pas être supérieur au nombre total d'éléments"
                );
              } else {
                setPer(e.target[0].value);
              }
            }
          }}
          className="text-[14px] flex space-x-4 items-center justify-end"
        >
          <span>Per page </span>
          <input
            type="number"
            name="per"
            id="per"
            min={1}
            max={products.length}
            defaultValue="5"
            autoComplete="none"
            className="px-4 text-[13px] h-[30px] border border-gray-400 rounded-md font-semibold"
          />
        </form>
      </div>

      {message !== "" && (
        <div className="w-full px-4 py-2 mb-4 bg-green-200 border border-green-500 rounded-md">
          {message}
        </div>
      )}

      {!loading ? (
        <div className="flex flex-col w-full space-y-4">
          <div className="w-full overflow-x-auto overflow-y-hidden rounded-lg">
            <table className="w-full border-collapse table-auto bg-cyan-50">
              <thead className=" text-gray-100 !rounded-xl bg-gray-900 ">
                <tr className="">
                  <th>
                    <input
                      onChange={(e) => fillAll(e.target.checked)}
                      type="checkbox"
                      name=""
                      value=""
                    />
                    <span>Tout</span>
                  </th>
                  <th onClick={() => updateSort("id")} className="!text-center">
                    <div className="flex space-x-4">
                      <span>ID</span>
                      <span>
                        {sortBy === "id" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => updateSort("name")}>
                    <div className="flex space-x-4">
                      <span>Name</span>

                      <span>
                        {sortBy === "name" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => updateSort("price")}>
                    <div className="flex space-x-4">
                      <span>Price</span>
                      <span>
                        {sortBy === "price" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => updateSort("quantity")}>
                    <div className="flex space-x-4">
                      <span>Quantity</span>
                      <span>
                        {sortBy === "quantity" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => updateSort("date")}>
                    <div className="flex space-x-4">
                      <span>Date</span>
                      <span>
                        {sortBy === "date" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>
                  <th onClick={() => updateSort("category")}>
                    <div className="flex space-x-4">
                      <span>Category</span>
                      <span>
                        {sortBy === "category" &&
                          (sortOrder === "asc" ? (
                            <i className="bi-caret-down-fill"></i>
                          ) : (
                            <i className="bi-caret-up-fill"></i>
                          ))}
                      </span>
                    </div>
                  </th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterBy(products).length > 0 ? (
                  filterBy(products)
                    .slice(sliceStart, sliceEnd)
                    .map((product, index) => {
                      return (
                        <tr
                          onDoubleClick={() => updateSelected(product.id - 1)}
                          className={selected[product.id - 1] && "bg-green-200"}
                          key={"line" + product.id}
                        >
                          <td>
                            <input
                              onChange={() => updateSelected(product.id - 1)}
                              type="checkbox"
                              name=""
                              key={"check" + index}
                              checked={selected[product.id - 1]}
                              value={product.id}
                              id={product.id}
                            />
                          </td>
                          <td className="!text-center">{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.date}</td>
                          <td>{product.category}</td>
                          <td>
                            <div className="flex space-x-4 text-[20px] items-center justify-center">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  edit(product.id);
                                }}
                                className="text-green-500"
                              >
                                <i className="bi-pencil-fill"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  // eslint-disable-next-line no-restricted-globals
                                  confirm(
                                    "Etes-vous sûr de vouloir supprimer ce produit ?"
                                  ) && deleteProduct(product.id);
                                }}
                                className="text-red-500"
                              >
                                <i className="bi-trash2-fill"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Aucun résultat
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center justify-between w-full lg:flex-row lg:space-x-4">
            <span className="text-[14px]">
              Showing{" "}
              <span>
                {page * per <= products.length ? per : 10 - (page - 1) * per} of{" "}
                {products.length}
              </span>
            </span>

            {selected.find((element) => element === true) && (
              <button
                onClick={deleteSelection}
                className="px-3 py-1 text-red-600 bg-red-200 rounded-md"
              >
                Supprimer les éléments sélectionnés
              </button>
            )}

            {per < products.length && (
              <div className="flex flex-col items-center md:flex-row [&>*]:px-4 [&>*]:py-1 text-[14px] flex-1">
                {page > 1 && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page - 1);
                    }}
                    to={"?page=" + (page - 1)}
                    className="text-blue-500 h-fit"
                  >
                    {"<<"} Précédent
                  </Link>
                )}

                <div className="grid grid-cols-5 gap-3 md:grid-cols-10 md:max-w-[600px]">
                  {new Array(pageCount).fill(1).map((e, index) => {
                    return (
                      <>
                        <Link
                          key={index}
                          className={`${
                            page === index + 1 &&
                            "bg-blue-500 text-gray-50 px-3 h-fit w-fit rounded-md hover:shadow-lg hover:shadow-blue-400"
                          } underline` }
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(index + 1);
                          }}
                          to={"?page=" + (index + 1)}
                        >
                          {index + 1}
                        </Link>
                      </>
                    );
                  })}
                </div>
                {page < pageCount && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                    to={"?page=" + (page + 1)}
                    className="text-blue-500 h-fit"
                  >
                    Suivant {">>"}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* //Formulaire d'ajout de produits */}
      {openAddForm && (
        <div className="fixed -top-4 left-0 z-20 flex items-center justify-center w-full  h-screen overflow-auto bg-black/70">
          <div className="bg-white rounded-md w-full md:w-[60%] lg:w-[40%] mx-2 flex flex-col items-center space-y-4 p-4">
            <p>Add a new product</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                add(e);
              }}
              action=""
              className="flex flex-col items-center w-full space-y-3"
            >
              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {nameError !== "" && (
                  <p className="text-red-500">{nameError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="price" className="text-gray-500">
                  Price
                </label>
                <input
                  type="number"
                  min={1}
                  name="price"
                  id="price"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {priceError !== "" && (
                  <p className="text-red-500">{priceError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="quantity" className="text-gray-500">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {quantityError !== "" && (
                  <p className="text-red-500">{quantityError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="date" className="text-gray-500">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {dateError !== "" && (
                  <p className="text-red-500">{dateError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-500">
                  Category
                </label>
                <select
                  id="category"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="chaussures">Chaussures</option>
                  <option value="creme de beauté">Crême de beauté</option>
                  <option value="divers">Divers</option>
                  <option value="parfums">Parfums</option>
                </select>
                {categoryError !== "" && (
                  <p className="text-red-500">{categoryError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 w-[95%]">
                <button
                  type="button"
                  onClick={() => setOpenAddForm(false)}
                  className="px-3 py-1 text-red-600 bg-red-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 rounded-md text-gray-50"
                >
                  + Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* //Formulaire de modification de produits */}
      {openEditForm && (
        <div className="fixed -top-4 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto bg-black/70">
          <div className="bg-white mx-2 rounded-md w-full md:w-[60%] lg:w-[40%] flex flex-col items-center space-y-4 p-4">
            <p>Update product {idUpdate} </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(e);
              }}
              action=""
              className="flex flex-col items-center w-full space-y-3"
            >
              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-500">
                  Id
                </label>
                <input
                  type="text"
                  name="id"
                  id="id"
                  disabled
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].id
                  }
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {nameError !== "" && (
                  <p className="text-red-500">{nameError}</p>
                )}
              </div>
              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].name
                  }
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {nameError !== "" && (
                  <p className="text-red-500">{nameError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="price" className="text-gray-500">
                  Price
                </label>
                <input
                  type="number"
                  min={1}
                  name="price"
                  id="price"
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].price
                  }
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {priceError !== "" && (
                  <p className="text-red-500">{priceError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="quantity" className="text-gray-500">
                  Quantity
                </label>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].quantity
                  }
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {quantityError !== "" && (
                  <p className="text-red-500">{quantityError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="date" className="text-gray-500">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].date
                  }
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                />
                {dateError !== "" && (
                  <p className="text-red-500">{dateError}</p>
                )}
              </div>

              <div className="w-[95%] flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-500">
                  Category
                </label>
                <select
                  id="category"
                  className="h-[30px] w-full font-semibold border rounded-md px-2 outline-blue-500"
                  defaultValue={
                    products[
                      products.findIndex((product) => product.id === idUpdate)
                    ].category
                  }
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="chaussures">Chaussures</option>
                  <option value="creme de beauté">Crême de beauté</option>
                  <option value="divers">Divers</option>
                  <option value="parfums">Parfums</option>
                </select>
                {categoryError !== "" && (
                  <p className="text-red-500">{categoryError}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4 w-[95%]">
                <button
                  type="button"
                  onClick={() => setOpenEditForm(false)}
                  className="px-3 py-1 text-red-600 bg-red-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 rounded-md text-gray-50"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
