import { Ref, useRef, useState } from "react";
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Switch from "rc-switch";
import { Formik, FormikErrors, FormikProps } from "formik";

import { post } from "../../helpers/request";
import BreadCrumb from "../../components/Breadcrumb";

import 'rc-switch/assets/index.css'

interface Item {
  id?: number | null;
  keyWord: string;
  maxPrice: string;
  activated: boolean;
}

type ErroForm = { [K in keyof Item]?: string };

export default function ItemRegistry() {

  const history = useNavigate();

  const innerRef = useRef<FormikProps<Item>>();

  const [isSaving, setIsSaving] = useState(false);
  // const [item, setItem] = useState();

  const save = () => {
    const { isValid, values } = innerRef?.current ?? {};

    if (!isValid) {
      return;
    }

    setIsSaving(true);

    post("/",
      {
        ...values
      })
      .then(() => {
        setIsSaving(false);
        history(-1);
      })
      .catch((error) => {
        setIsSaving(false);
        console.debug(error);
      });
  }

  const deleteData = () => {
    console.debug("aqui");
    history(-1);
  } 

  const validate = (dados: Item): FormikErrors<Item> => {
    const {
      keyWord,
      maxPrice
    } = dados;

    const erro: ErroForm = {};

    if (keyWord.length === 0) {
      erro.keyWord = "Digite uma palavra-chave";
    }

    if (maxPrice.length === 0) {
      erro.maxPrice = "Digite o valor máximo";
    }

    return erro;
  }

  return (
    <>
      <Row>
        <Col xs="12" className="position-relative">
          <BreadCrumb heading="Registro de Pesquisa" />
          <div className="right-breadcrumb">
            {
              isSaving ? (
                <Button onClick={save} disabled={isSaving} size="lg">Salvar</Button>
              ) : (
                <UncontrolledDropdown group>
                  <Button onClick={save} size="lg" color="primary">
                    Salvar
                  </Button>
                  <DropdownToggle
                    caret
                    color="primary"
                  />
                  <DropdownMenu right>
                    <DropdownItem onClick={deleteData}>
                      Excluir
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )
            }
          </div>
          <div className="separator mb-4" />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card className="h-100 p-4">
            <Formik
              initialValues={{
                id: null,
                keyWord: "",
                maxPrice: "",
                activated: false
              }}
              validate={validate}
              validateOnMount
              innerRef={innerRef as Ref<FormikProps<Item>> | undefined}
              onSubmit={() => { }}>
              {({ values, setFieldValue }) => (
                <>
                  <Row className="mb-3">
                    <Col xs="12">
                      <Label>Palavra-Chave</Label>
                      <Input
                        value={values.keyWord}
                        onChange={(e) => {
                          setFieldValue('keyWord', e.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="9">
                      <Label>Preço Máximo</Label>
                      <Input
                        value={values.maxPrice}
                        onChange={(e) => {
                          setFieldValue('maxPrice', e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs="3">
                      <div className="d-flex align-items-center justify-content-around h-100">
                        <div>Desativado</div>
                        <Switch
                          checked={values.activated}
                          onChange={(value) => {
                            setFieldValue('activated', value);
                          }}
                          className="custom-switch"
                        />
                        <div>Ativado</div>
                      </div>
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