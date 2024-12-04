import { Button, Col, Row, Table } from "reactstrap";
import BreadCrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import CardItem from "./cardItem";
import { useEffect, useState } from "react";
import { get } from "../../helpers/request";
import { getCurrentUser } from "../../helpers/utilities";

export interface SearchItem {
  id: number | null,
  query: string;
  maxPrice: string;
  minPrice: string;
  isActive: boolean
}

export default function ListItens() {

  const history = useNavigate();

  const [items, setItems] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = getCurrentUser()?.id;
    get(`search/user/${userId}`).then((res) => {
      setItems(res?.data ?? []);
      setIsLoading(false)
    });
  }, []);

  const goToRegistry = () => {
    history('/app/itemRegistry')
  }

  if(isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <>
      <Row>
        <Col xs="12" className="position-relative">
          <BreadCrumb heading="Itens" />
          <div className="right-breadcrumb">
            <Button color="primary" onClick={goToRegistry} size="lg">Adicionar</Button>
          </div>
          <div className="separator" />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card-table">
            <Table className="table-card">
              <thead>
                <tr>
                  <th>Palavra-Chave</th>
                  <th className="text-center">Preço Mínimo</th>
                  <th className="text-center">Preço Máximo</th>
                  <th className="text-center">Situação</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <CardItem key={item.id} item={item} />
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
}