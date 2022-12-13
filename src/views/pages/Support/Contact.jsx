import React from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  useDocumentTitle("NFJ Labs- Contact");
  return (
    <div>
      <Header />
      <div
        className="contact justify-content-center"
        style={{ marginBottom: "80px" }}
      >
        <div className="col-md-8 contact__content">
          <div className="" style={{ maxWidth: "700px", margin: "0 auto " }}>
            <div className="content__wrap space-y-20">
              <div className="space-y-20">
                <h1 className="text-left">Hi,we are NFJ LABS</h1>
                <p className="contact__desc">
                  We’re here to help and answer any question you might have.
                  <br /> We look forward to hearing from you 🙂
                </p>
              </div>
              <form
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="box is__big">
                  <div className="space-y-10 mb-0">
                    <div className="row sm:space-y-20">
                      <div className="col-md-6 space-y-20">
                        <div className="space-y-10">
                          <span className="nameInput">
                            Email address{" "}
                            <span style={{ color: "red" }}>*</span>
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="example@info.com"
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 space-y-20">
                        <div className="space-y-10">
                          <span className="nameInput">
                            Full Name <span style={{ color: "red" }}>*</span>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ritik"
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="col-12 mt-20">
                        <div className="space-y-10">
                          <span className="nameInput">Message</span>
                          <textarea
                            style={{ minHeight: 110 }}
                            className="mb-0"
                            defaultValue={
                              "                                        "
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    // onClick={notify}
                    >
                      Send your message
                    </button>
                    <ToastContainer position="top-right" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
