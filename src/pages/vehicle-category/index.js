import React, { useEffect, useState } from "react";
import { getVehicleByCategory } from "../../utils/vehicle/index";
import Loading from "../../animation/Loading";
import Header from "../../components/navLogin";
import "./index.scoped.css";
import Card from "../../components/Card";
import FooterTemp from "../../components/footerTemp";
import { useLocation, useHistory } from "react-router-dom";

function Index({ match, location }) {
  const [category, setCategory] = useState(match.params.category);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("DESC");
  const [sorting, setSorting] = useState("name");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const history = useHistory();

  const getVehicle = async () => {
    setLoading(true);
    try {
      const result = await getVehicleByCategory(category + location.search);
      console.log("RESULT", result.data.result.result.data);
      setData(result.data.result.result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const nextPath = `${pathname}?page=${page}&limit=8&order=${order}&sorting=${sorting}`;
    history.push(nextPath);
    getVehicle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, order, sorting]);

  useEffect(() => {
    getVehicle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCounter = () => {
    setPage(page + 1);
  };

  const subCounter = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      return;
    }
  };

  console.log(pathname);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <Header />
          <h1 className="heading">{category}</h1>
          <div className="select">
            <select class="form-select option shadow-none" aria-label="Default select example" onChange={(e) => setSorting(e.target.value)}>
              <option selected>{sorting}</option>
              <option value="id">Newest (Default)</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
            </select>
            <select class="form-select option shadow-none" aria-label="Default select example" onChange={(val) => setOrder(val.target.value)} placeholder="Sorting">
              <option selected>{order}</option>
              <option value="ASC">ASCENDING</option>
              <option value="DESC">DESCENDING</option>
            </select>
          </div>
          <div className="card-container">
            {data.map((val) => {
              return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
          <div className="paginasi">
            <button className="btn btn-secondary" onClick={subCounter}>
              Prev
            </button>
            <h1>{page}</h1>
            <button className="btn btn-warning" onClick={addCounter}>
              Next
            </button>
          </div>
          <FooterTemp />
        </div>
      )}
    </>
  );
}

export default Index;
