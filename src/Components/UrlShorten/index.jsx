import url from "./url.png";
import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function MyUrlShorten() {
  const [fullUrlText, setFullUrlText] = useState("");
  const [UrlData, setUrlData] = useState("");
  const [userData, setUserData] = useState(null);
  const [shortUrl, setShortUrl] = useState(false);
  const [qrCodeImg, setQrCodeImage] = useState(false);
  const [backButton, setBackButton] = useState(false);
  const [showUrlTable, setShowUrlTable] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };

  const onConfirm = () => {
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setQrCodeImage("");
    setShortUrl("");
    setUrlList([]);
    setIsModalOpen(false);
  };
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setShortUrl(true);
    setQrCodeImage(true);
    setBackButton(true);
    axios
      .post(
        "http://localhost:8080/url",
        { fullUrl: fullUrlText },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        const newUrl = {
          fullUrl: fullUrlText,
          shorturl: res.data.url.shortUrl,
          qrimage: res.data.qrCodeImage,
          clicks: res.data.url.clicks,
        };
        setUrlList((prevList) => [...prevList, newUrl]);
        setQrCodeImage(res.data.qrCodeImage);
        setShortUrl(res.data.url.shortUrl);
        setShowUrlTable(true);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const onFullUrlChange = (e) => {
    setFullUrlText(e.target.value);
  };

  useEffect(() => {
    const savedUsers = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUsers && token) {
      setUserData(JSON.parse(savedUsers, token));

      axios
        .get("http://localhost:8080/url", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("get data", res.data.urls);
          setUrlList(res.data.urls);
          setShowUrlTable(true);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, []);

  const onUserLogout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="register">
        <div className="navbar">
          <div className="logo">Shrinkly</div>

          <div className="log">
            {userData ? (
              <>
                <h5>Hey, {userData.name}</h5>
                <button onClick={onUserLogout}>Logout</button>
              </>
            ) : (
              <Link to="/urlshorter/login">
                <button>LogIn</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="form-container">
        <div className="register"></div>
        <div className="originalUrl">
          <form onSubmit={handleUrlSubmit}>
            <h6>Url Shorten</h6>
            <div className="text">
              Use our URL shortener, QR Codes, and landing pages to engage your
              audience and connect them to the right information.
            </div>
            <div className="input-field-url">
              <input
                type="text"
                name="text"
                id=""
                placeholder="Enter the link here"
                onChange={onFullUrlChange}
              />
              <button type="submit">Shorten</button>{" "}
            </div>
          </form>
        </div>
        <div className="shorten">
          {qrCodeImg && <img src={qrCodeImg} alt="QR Code is generated" />}
          {shortUrl && (
            <h4>
              Short Url:{" "}
              <a href={`http://localhost:8080/${shortUrl}`}> {shortUrl}</a>
            </h4>
          )}
        </div>
      </div>
      {showUrlTable && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>QR Code</th>
                <th>Clicks</th>
              </tr>
            </thead>

            <tbody>
              {urlList.map((urlValue, index) => (
                <tr key={index}>
                  <td>{urlValue.fullUrl}</td>
                  <td>
                    {userData ? (
                      <a href={`http://localhost:8080/${urlValue.shortUrl}`}>
                        {urlValue.shortUrl}{" "}
                      </a>
                    ) : (
                      <a href={`http://localhost:8080/${urlValue.shorturl}`}>
                        {urlValue.shorturl}
                      </a>
                    )}
                  </td>
                  <td>
                    <img
                      src={userData ? urlValue.qrCode : urlValue.qrimage}
                      width="50"
                      alt="QR"
                    />
                  </td>
                  <td>{urlValue.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button className="btn btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-confirm" onClick={onConfirm}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
