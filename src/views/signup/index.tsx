import { useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { Formik, FormikErrors, FormikProps } from "formik";

import { post } from "../../helpers/request";

import "../../assets/css/sass/views/auth.scss"
import { toast } from "react-toastify";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type ErroForm = { [K in keyof User]?: string };

export default function SignUp(){

  const history = useNavigate();

  const innerRef = useRef<FormikProps<User>>();

  const [isSaving, setIsSaving] = useState(false);

  const validate = (dados: User): FormikErrors<User> => {
    const {
      firstName,
      lastName,
      email,
      password
    } = dados;

    const erro: ErroForm = {};

    if(firstName.length === 0) {
      erro.firstName = "Digite seu nome";
    }

    if(lastName.length === 0) {
      erro.lastName = "Digite seu sobrenome";
    }

    if(email.length === 0) {
      erro.email = "Digite um email válido";
    }

    if(password.length === 0) {
      erro.password = "Digite sua senha";
    }

    return erro;
  }

  const save = () => {
    const { isValid, values } = innerRef?.current ?? {};

    if(!isValid) {
      return;
    }

    setIsSaving(true);

    post("/user", {
      ...values
    })
      .then(() => {
        setIsSaving(false);
        history("/login", { replace: true });
      })
      .catch((error) => {
        setIsSaving(false);
        console.debug(error);
      });
  }

  const notify = () => toast.success("Notificação de sucesso!", { 
    // position: toast.POSITION.TOP_RIGHT 
  });

  return (
    <div className="container">
      <Row className="h-100">
        <Col xs="12" className="mx-auto my-auto d-flex justify-content-center">
          <Card className="auth-card w-50">
            <CardTitle className="mb-4">Cadastre-se</CardTitle>
            <Formik
              validate={validate}
              validateOnMount
              innerRef={innerRef as React.Ref<FormikProps<User>> | undefined}
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: ""
              }} 
              onSubmit={() => {}}
            >
              {({ setFieldValue, values }) => (
                <>
                <FormGroup className="has-float-label">
                <Label>Nome</Label>
                <Input
                  value={values.firstName}
                  onChange={(e) => {
                    setFieldValue('firstName', e.target.value);
                  }}
                  />
              </FormGroup>
              <FormGroup className="has-float-label">
                <Label>Sobrenome</Label>
                <Input
                  value={values.lastName}
                  onChange={(e) => {
                    setFieldValue('lastName', e.target.value);
                  }}
                  />
              </FormGroup>
              <FormGroup className="has-float-label">
                <Label>Email</Label>
                <Input
                  type='email'
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                  }}
                  />
              </FormGroup>
              <FormGroup className="has-float-label">
                <Label>Senha</Label>
                <Input 
                  type="password"
                  value={values.password}
                  onChange={(e) => {
                    setFieldValue('password', e.target.value);
                  }}
                />
              </FormGroup>
                </>
              )}
            </Formik>
            <div className="d-flex justify-content-between">
              <NavLink className="align-content-center" to="/login">Login</NavLink>
              <Button disabled={isSaving} size="lg" onClick={() => save()}>
                Cadastrar
              </Button>
              <Button onClick={() => {
                notify()
              }}>teste</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}