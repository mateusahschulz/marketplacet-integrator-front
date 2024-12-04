import { Ref, useEffect, useRef, useState } from "react";
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Row, UncontrolledDropdown } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Switch from "rc-switch";
import { Formik, FormikErrors, FormikProps } from "formik";

import { delet, get, post, put } from "../../helpers/request";
import BreadCrumb from "../../components/Breadcrumb";

import 'rc-switch/assets/index.css'
import { getCurrentUser } from "../../helpers/utilities";
import { SearchItem } from "../listItens";


type ErroForm = { [K in keyof SearchItem]?: string };

export default function ItemRegistry() {
  const [searchParams] = useSearchParams();
  const [id] = useState(searchParams.get('id') ?? null);

  const history = useNavigate();

  const innerRef = useRef<FormikProps<SearchItem>>();

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState<SearchItem>();

  useEffect(() => {
    if (id != null) {
      get(`/search/${id}`).then((res) => {
        setItem(res?.data);
        setIsLoading(false)
      });
    } else {
      setItem(undefined);
      setIsLoading(false)
    }
  }, [id]);

  const save = () => {
    const { isValid, values } = innerRef?.current ?? {};

    if (!isValid) {
      return;
    }

    const { query, maxPrice, minPrice, isActive } = values ?? {};
    setIsSaving(true);
    if (id == null) {
      post("/search",
        {
          query,
          maxPrice: Number(maxPrice),
          minPrice: Number(minPrice),
          isActive,
          userId: getCurrentUser()?.id
        })
        .then(() => {
          setIsSaving(false);
          history(-1);
        })
        .catch((error) => {
          setIsSaving(false);
          console.debug(error);
        });
    } else {
      put(`/search/${id}`,
        {
          query,
          maxPrice: Number(maxPrice),
          minPrice: Number(minPrice),
          isActive,
        })
        .then(() => {
          setIsSaving(false);
        })
        .catch((error) => {
          setIsSaving(false);
          console.debug(error);
        });
    }
  }

  const deleteData = () => {
    delet(`/search/${id}`).then(() => {
      history(-1);
    })
  }

  const validate = (dados: SearchItem): FormikErrors<SearchItem> => {
    const {
      query,
      maxPrice,
      minPrice
    } = dados;

    const erro: ErroForm = {};

    if (query.length === 0) {
      erro.query = "Digite uma palavra-chave";
    }

    if (maxPrice.length === 0) {
      erro.maxPrice = "Digite o valor máximo";
    }

    if (minPrice.length === 0) {
      erro.minPrice = "Digite o valor mínimo";
    }

    return erro;
  }

  if (isLoading) {
    return <div className="loading" />;
  }

  return (
    <>
      <Row>
        <Col xs="12" className="position-relative">
          <BreadCrumb heading="Registro de Pesquisa" />
          <div className="right-breadcrumb">
            {
              id == null ? (
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
                id: item?.id ?? null,
                query: item?.query ?? "",
                maxPrice: item?.maxPrice ?? "",
                minPrice: item?.minPrice ?? "",
                isActive: item?.isActive ?? false
              }}
              validate={validate}
              validateOnMount
              innerRef={innerRef as Ref<FormikProps<SearchItem>> | undefined}
              onSubmit={() => { }}>
              {({ values, setFieldValue }) => (
                <>
                  <Row className="mb-3">
                    <Col xs="9">
                      <Label>Palavra-Chave</Label>
                      <Input
                        value={values.query}
                        onChange={(e) => {
                          setFieldValue('query', e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs="3">
                      <div className="d-flex align-items-center justify-content-around h-100">
                        <div>Desativado</div>
                        <Switch
                          checked={values.isActive}
                          onChange={(value) => {
                            setFieldValue('isActive', value);
                          }}
                          className="custom-switch"
                        />
                        <div>Ativado</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">
                      <Label>Preço Mínimo</Label>
                      <Input
                        type="number"
                        value={values.minPrice}
                        onChange={(e) => {
                          setFieldValue('minPrice', e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs="6">
                      <Label>Preço Máximo</Label>
                      <Input
                        type="number"
                        value={values.maxPrice}
                        onChange={(e) => {
                          setFieldValue('maxPrice', e.target.value);
                        }}
                      />
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