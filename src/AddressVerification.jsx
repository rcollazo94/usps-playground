import React, { useState } from "react";
import Input from "./Input";
import { ADDRESSES } from "./constants";

const AddressVerification = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip5, setZip5] = useState("");
  const [zip4, setZip4] = useState("");

  const [verifiedAddress1, setVerifiedAddress1] = useState("");
  const [verifiedAddress2, setVerifiedAddress2] = useState("");
  const [verifiedCity, setVerifiedCity] = useState("");
  const [verifiedState, setVerifiedState] = useState("");
  const [verifiedZip5, setVerifiedZip5] = useState("");
  const [verifiedZip4, setVerifiedZip4] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const clearVerified = () => {
    setVerifiedAddress1("");
    setVerifiedAddress2("");
    setVerifiedCity("");
    setVerifiedState("");
    setVerifiedZip5("");
    setVerifiedZip4("");
  };

  const handleClear = () => {
    clearVerified();

    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");
    setZip5("");
    setZip4("");

    setMessage(null);
  };

  const handleVerify = () => {
    clearVerified();
    setMessage(null);
    setLoading(true);

    const data = { address1, address2, city, state, zip5, zip4 };

    fetch(
      "https://lpcslsaddressapifa-dev.azurewebsites.net/api/GetStandardizedAddress?code=WyYIeqJlOfV1kO0/dxrqcXz290BbFHxVlsaYdG77m2DZ4piYA/UXiQ==",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.isSuccess) {
          if (data.isVerified) {
            setVerifiedAddress1(data.address1);
            setVerifiedAddress2(data.address2);
            setVerifiedCity(data.city);
            setVerifiedState(data.state);
            setVerifiedZip5(data.zip5);
            setVerifiedZip4(data.zip4);

            setMessage({
              text: "The address was verified successfully.",
              role: "success",
            });
          } else {
            setMessage({
              text: "The address was not verified.",
              role: "warning",
            });
          }
        } else {
          setMessage({
            text:
              "The address verification process failed. Please check the logs.",
            role: "danger",
          });
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleAddressChange = (e) => {
    handleClear();
    const value = e.target.value;

    if (value !== "") {
      const address = ADDRESSES[parseInt(value)];

      setAddress1(address.Address1);
      setAddress2(address.Address2);
      setCity(address.City);
      setState(address.State);
      setZip5(address.Zip5);
      setZip4(address.Zip4);
    }
  };

  return (
    <>
      <h1>USPS Address Verification Playground</h1>
      <hr />
      <h2>Populate Address</h2>
      <select onChange={handleAddressChange} className="form-control">
        <option></option>
        {ADDRESSES.map((address, index) => {
          return (
            <option key={index} value={index}>
              [{index + 1}] - {address.Address1}
            </option>
          );
        })}
      </select>
      <br />
      <hr />
      <div className="container">
        <div className="row section">
          <div className="col">
            <h2>Address</h2>
            <Input
              label="Address1"
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
            />
            <Input
              label="Address2"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
            />
            <div className="row">
              <div className="col">
                <Input
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                />
              </div>
              <div className="col">
                <Input
                  label="State"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input
                  label="Zip5"
                  onChange={(e) => setZip5(e.target.value)}
                  value={zip5}
                />
              </div>
              <div className="col">
                <Input
                  label="Zip4"
                  onChange={(e) => setZip4(e.target.value)}
                  value={zip4}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end btn-container">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleVerify()}
              >
                Verify
              </button>
              {loading && (
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ marginLeft: "20px" }}
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleClear()}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="col">
            <h2>Verified Address</h2>
            <Input label="Address1" readonly={true} value={verifiedAddress1} />
            <Input label="Address2" readonly={true} value={verifiedAddress2} />
            <div className="row">
              <div className="col">
                <Input label="City" readonly={true} value={verifiedCity} />
              </div>
              <div className="col">
                <Input label="State" readonly={true} value={verifiedState} />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Input label="Zip5" readonly={true} value={verifiedZip5} />
              </div>
              <div className="col">
                <Input label="Zip4" readonly={true} value={verifiedZip4} />
              </div>
            </div>
            {message && (
              <div className={`alert alert-${message.role}`} role="alert">
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressVerification;
