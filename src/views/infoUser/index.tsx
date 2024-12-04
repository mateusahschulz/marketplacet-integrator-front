import { Ref, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import { Formik, FormikErrors, FormikProps } from "formik";

import { get, put } from "../../helpers/request";
import BreadCrumb from "../../components/Breadcrumb";
import { getCurrentUser } from "../../helpers/utilities";

interface UserData {
  firstName: string
  lastName: string
  email: string
}

type ErroForm = { [K in keyof UserData]?: string };

export default function InfoUser() {

  const [dados, setDados] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const innerRef = useRef<FormikProps<UserData>>();

  useEffect(() => {
    const userId = getCurrentUser()?.id;
    get(`/user/${userId}`).then((res) => {
      setIsLoading(false)
      setDados(res?.data)
    });
  }, []);

  const validate = (dados: UserData): FormikErrors<UserData> => {
    const {
      firstName,
      lastName,
    } = dados;

    const erro: ErroForm = {};

    if (firstName.length === 0) {
      erro.firstName = "Digite seu nome";
    }

    if (lastName.length === 0) {
      erro.lastName = "Digite seu sobrenome";
    }

    return erro;
  }

  const salvar = () => {
    const { isValid, values } = innerRef?.current ?? {};

    if (!isValid) {
      return;
    }

    setIsSaving(true);

    put("/user/1",
      {
        firstName: values?.firstName,
        lastName: values?.lastName,
      })
      .then(() => {
        setIsSaving(false);
      })
      .catch((error) => {
        setIsSaving(false);
        console.debug(error);
      });
  }

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <>
      <Row>
        <Col xs="12" className="position-relative">
          <BreadCrumb heading="Informações de Usuário" />
          <div className="right-breadcrumb">
            <Button disabled={isSaving} onClick={() => salvar()} size="lg">Salvar</Button>
          </div>
          <div className="separator mb-4" />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card className="h-100 p-4">
            <Formik
              initialValues={{
                firstName: dados?.firstName ?? "",
                lastName: dados?.lastName ?? "",
                email: dados?.email ?? ""
              }}
              innerRef={innerRef as Ref<FormikProps<UserData>> | undefined}
              validateOnMount
              validate={validate}
              onSubmit={() => { }}
            >
              {({ values, setFieldValue }) => (
                <>
                  <Row className="mb-3">
                    <Col xs="6">
                      <Label>Nome</Label>
                      <Input
                        defaultValue={values.firstName}
                        onChange={(e) =>
                          setFieldValue('firstName', e.target.value)
                        }
                      />
                    </Col>
                    <Col xs="6">
                      <Label>Sobrenome</Label>
                      <Input
                        defaultValue={values.lastName}
                        onChange={(e) =>
                          setFieldValue('lastName', e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">
                      <Label>Email</Label>
                      <Input
                        value={values.email}
                        // onChange={(e) => 
                        //   setFieldValue('firstName', e.target.value)
                        // }
                        disabled
                        type="email"
                      />
                    </Col>
                    <Col xs="6">
                      <Label>Senha</Label>
                      <Input value="*******" disabled type="password" />
                    </Col>
                  </Row>
                </>
              )}
            </Formik>
          </Card>
        </Col>
      </Row>
    </>
  );
}