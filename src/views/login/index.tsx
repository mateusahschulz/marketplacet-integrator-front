import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, CardTitle, Col, FormGroup, Input, Label, Row } from "reactstrap";

import { setCurrentUser } from "../../helpers/utilities";
import { post } from "../../helpers/request";

import "../../assets/css/sass/views/auth.scss";

export default function Login(){

  const history = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const authenticate = () => {

    if(email.length === 0 || password.length === 0) {
      return;
    }

    setIsAuthenticating(true);

    post("/auth/login", {
        email,
        password
      }
    ).then((res) => {
      setIsAuthenticating(false);
      setCurrentUser(res?.data);
      history("/app", { replace: true });
    }).catch((error) => {
      console.debug(error);
      setIsAuthenticating(false);
    });
  }

  return (
    <div className="container">
      <Row className="h-100">
        <Col xs="12" className="mx-auto my-auto d-flex justify-content-center">
          <Card className="auth-card w-50">
            <CardTitle className="mb-4">Bem-vindo!</CardTitle>
            <FormGroup className="has-float-label">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormGroup>
            <FormGroup className="has-float-label">
              <Label>Senha</Label>
              <Input 
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormGroup>
            <div className="d-flex justify-content-between">
              <NavLink className="align-content-center" to="/signup">Cadastre-se</NavLink>
              <Button size="lg" disabled={isAuthenticating} onClick={() => authenticate()}>
                Entrar
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}