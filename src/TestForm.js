import { Fragment, useState } from "react";
import cloneDeep from "lodash/cloneDeep";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
function TestForm() {
  const [emailId, setEmailId] = useState("");
  const [phoneArray, setPhoneNum] = useState([
    { number: "", errorMessage: null },
  ]);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleOnFieldChange = (fieldType, e, phoneIndex = 0) => {
    let value = e.target.value;
    console.log("value", value);
    if (fieldType === "emailId") {
      setEmailId(value);
      //return;
    }
    if (fieldType === "phone") {
      let tempPhoneArray = cloneDeep(phoneArray);

      if (tempPhoneArray[phoneIndex]) {
        tempPhoneArray[phoneIndex].number = value;
        setPhoneNum(tempPhoneArray);

        //return;
      }
    }
  };

  function handleAddMore() {
    let tempPhoneArray = cloneDeep(phoneArray);
    tempPhoneArray.push({ number: null, errorMessage: null });
    setPhoneNum(tempPhoneArray);
  }

  const removeNumber = (arrayIndex) => {
    let tempPhoneArray = cloneDeep(phoneArray);

    if (tempPhoneArray[arrayIndex]) {
      tempPhoneArray.splice(arrayIndex, 1);
      setPhoneNum(tempPhoneArray);
    }
  };

  return (
    <Fragment>
      <div className="main-container">
        <Container fluid={true}>
          <Row className="justify-content-md-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="justify-content-md-center">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={emailId}
                    onChange={(it) => handleOnFieldChange("emailId", it)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid email id
                  </Form.Control.Feedback>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br></br>
              {phoneArray &&
                phoneArray.length > 0 &&
                phoneArray.map(({ number, errorMessage }, index) => (
                  <div key={index}>
                    <Row className="justify-content-md-center">
                      <Col sm={4}>
                        <Form.Label>Phone number #{index + 1}</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Phone"
                          value={number ? number : ""}
                          onChange={(it) =>
                            handleOnFieldChange("phone", it, index)
                          }
                          {...(index > 0 ? { required: true } : {})}
                        />
                      </Col>
                      {index > 0 && (
                        <Col sm={2}>
                          <span onClick={() => removeNumber(index)}>
                            delete
                          </span>
                        </Col>
                      )}

                      <Form.Control.Feedback type="invalid">
                        {errorMessage}
                      </Form.Control.Feedback>
                    </Row>
                  </div>
                ))}
              <Stack gap={2} className="col-md-5 mx-auto">
                <Row className="justify-content-md-center">
                  <Col md={{ span: 4, offset: 4 }}>
                    <Button onClick={() => handleAddMore()} type="button">
                      Add more phone
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col md={4}>
                    <Button type="submit">Submit form</Button>
                  </Col>
                </Row>
              </Stack>
            </Form>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default TestForm;
