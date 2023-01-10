import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { completeKYC } from "../../../graphql/mutations";
import { useWeb3React } from "@web3-react/core";
import Header from "../../../components/header/Header";
import { kyc } from "../../../graphql/query";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { UserDetails } from "../../../graphql/query";

const KYCRegistration = () => {
  const { account } = useWeb3React();
  const [data, setData] = useState({
    username: "",
    fname: "",
    lname: "",
    dob: "",
    email: "",
    phone: 0,
    address: "",
    country: "India",
    identity: "",
  });
  const [createKyc, { error }] = useMutation(completeKYC);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  console.log(account);

  const { data: user } = useQuery(UserDetails, {
    variables: {
      walletAddress: account,
    },
  });

  console.log({ user: user?.user?.username });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, address, country, dob, email, identity, phone } =
      data;

    const res = await createKyc({
      variables: {
        username: user?.user?.username,
        fname,
        lname,
        dob,
        email,
        phone,
        address,
        country,
        identity,
      },
    });

    if (error) {
      console.log({ error });
    }

    console.log({ res });

    setShowLoading(false);
    setShowAlert(true);
  };

  useEffect(() => {
    setData({ ...data, username: user?.user?.username });
    console.log(data);
  }, [account]);

  return (
    <div>
      <Header />
      {showAlert && (
        <Alert variant={"success"}>
          Your KYC has been successfully submitted
        </Alert>
      )}

      <h1 style={{ textAlign: "center", marginTop: "40px", fontSize: "35px" }}>
        Complete Your KYC
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
            console.log(data);
          }}
          style={{
            marginTop: "22px",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div
            style={{
              gridTemplateColumns: "auto auto",
              justifyContent: "start",
              alignItems: "center",
              width: "100%",
              gap: "10px",
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                onChange={onChange}
                name="fname"
                type="text"
                placeholder="ex john"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={onChange}
                name="lname"
                type="text"
                placeholder="ex doe"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control onChange={onChange} name="dob" type="date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                onChange={onChange}
                name="email"
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={onChange}
                name="phone"
                type="number"
                placeholder="+91 7977298813"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={onChange}
                name="address"
                type="text"
                placeholder="24 street, Venice Town"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select onChange={onChange} name="country">
                <option>India</option>
                <option>United States</option>
                <option>Japan</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Your Passport</Form.Label>
              <Form.Control
                onChange={
                  (e) => setData({ ...data, identity: "" })
                  // setData({ ...data, identity: e.target.files[0] })
                }
                name="passport"
                type="file"
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            {showLoading ? "Loading..." : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default KYCRegistration;
