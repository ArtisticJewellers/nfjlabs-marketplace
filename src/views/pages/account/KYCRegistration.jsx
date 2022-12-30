import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { completeKYC } from "../../../graphql/mutations";
import { useWeb3React } from "@web3-react/core";
import Header from "../../../components/header/Header";
import { kyc } from "../../../graphql/query";
const KYCRegistration = () => {
  const { account } = useWeb3React();
  const [data, setData] = useState({
    wallet: account,
    fname: "",
    lname: "",
    dob: "",
    email: "",
    phone: 0,
    address: "",
    country: "India",
    identity: "",
  });
  const [kyc] = useMutation(completeKYC);
  console.log(account);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      wallet,
      fname,
      lname,
      dob,
      email,
      phone,
      address,
      country,
      identity,
    } = data;

    const res = await kyc({
      variables: {
        wallet,
        fname,
        lname,
        dob,
        email,
        phone,
        address,
        country,
        identity,
      },
      refetchQueries: [
        {
          query: kyc,
          variables: {
            walletAddress: account,
          },
        },
      ],
    });
    console.log({ res });
  };

  useEffect(() => {
    setData({ ...data, wallet: account });
  }, [account]);

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: "22px" }}>
        Complete Your KYC
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
              display: "grid",
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                onChange={onChange}
                name="lname"
                type="text"
                placeholder="ex doe"
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                onChange={onChange}
                name="phone"
                type="number"
                placeholder="+91 7977298813"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={onChange}
                name="address"
                type="text"
                placeholder="24 street, Venice Town"
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
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default KYCRegistration;
