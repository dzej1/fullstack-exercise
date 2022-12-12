import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ChangeEvent, MouseEvent, useReducer } from "react";
import { LoginFormReducerActionType, LoginFormType } from "../../types";
import { useUser } from "../../hooks";
import { useNavigate } from "react-router";

function reducer(
  formValues: LoginFormType,
  action: LoginFormReducerActionType
): LoginFormType {
  switch (action.type) {
    case "username": {
      return {
        ...formValues,
        username: action.newValue,
      };
    }
    case "password": {
      return {
        ...formValues,
        password: action.newValue,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const initialFormValues = {
  username: "",
  password: "",
};

function LoginRoute() {
  const { login, isLogged } = useUser();
  const navigate = useNavigate();
  const [formValues, dispatchValueChange] = useReducer(
    reducer,
    initialFormValues
  );

  if (isLogged) {
    navigate("/");
  }

  const changeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    return dispatchValueChange({
      newValue: e.target.value,
      type: e.target.name,
    });
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    login(formValues);
  };

  return (
    <Card className="m-auto mt-5 p-5 w-75 w-">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={changeInput}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeInput}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Card>
  );
}

export default LoginRoute;
