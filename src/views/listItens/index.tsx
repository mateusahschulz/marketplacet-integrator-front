import { Button, Col, Row, Table } from "reactstrap";
import BreadCrumb from "../../components/Breadcrumb";
import { NavLink, useNavigate } from "react-router-dom";
import CardItem from "./cardItem";

export default function ListItens() {

  const history = useNavigate();

  const goToRegistry = () => {
    history('/app/itemRegistry')
  }

  return (
    <>
    <Row>
      <Col xs="12" className="position-relative">
        <BreadCrumb heading="Itens"/>
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
            <th className="text-center">Preço Máximo</th>
            <th className="text-center">Situação</th>
          </tr>
        </thead>
        <tbody>
          {[{id: 1, keyword: "Produto", priceMax: "1", activated: false}].map((item) => (
            <CardItem item={item}/>
            // <tr key={item.id} className="card-row">
            //   <td>
            //     <NavLink to="/">
            //       {item.produto}
            //     </NavLink>
            //   </td>
            //   <td className="text-center">{item.title}</td>
            //   <td className="text-center">{item.description}</td>
            // </tr>
          ))}
        </tbody>
      </Table>
    </div>
      </Col>
    </Row>
    </>
  );
}