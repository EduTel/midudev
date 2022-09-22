import { useReducer, useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  let temp = ["img1"];
  let [search, setSearch] = useState("search");
  let [data, setData] = useState(temp);
  useEffect(() => {
    let key = "Y03KTALopBuTOeBEBbDYKU3xCZfch5tN";
    let data_catfact = async () => {
      let request = await fetch(`https://catfact.ninja/fact`);
      let request_json = await request.json();
      return request_json.fact.split(" ", 3).join(" ");
    };

    let data_giphy = async (search) => {
      let query = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=2`;
      console.log("query", query);
      let request = await fetch(query);
      let request_json = await request.json();
      return request_json.data;
    };
    data_catfact().then((search) => {
      console.log("search", search);
      data_giphy(search).then((data) => {
        setSearch(search);
        console.log(JSON.stringify(data));
        /* lo mismo que el map de abajo
        let img = [];
        for (const {
          images: {
            original: { url }
          }
        } of data) {
          img.push(url);
        }
        console.log("img", img);
        */
        let img2 = data.map(
          ({
            images: {
              original: { url }
            }
          }) => url
        );
        //setData(data);
        setData(img2);
      });
    });
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <table width="50%">
          <tbody>
            {data.map((dataJson, index) => {
              return (
                <tr>
                  <td>{search}</td>
                  <td>
                    <img alt={"img" + index} src={dataJson} max-width="300" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
