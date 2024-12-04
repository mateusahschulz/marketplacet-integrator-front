import { NavLink } from "react-router-dom";
import { Badge } from "reactstrap";

interface CardItemProps {
  item: {
    id: number,
    keyword: string;
    priceMax: string;
    activated: boolean
  }
}

export default function CardItem({ item }: CardItemProps) {
  const { id, keyword, priceMax, activated } = item;
  
  return (
    <tr key={`item-${id}`} className="card-row">
      <td>
        <NavLink to="/">
          {keyword}
        </NavLink>
      </td>
      <td className="text-center">
        {priceMax}
      </td>
      <td className="text-center">
        <Badge color={activated ? "success" : "danger" }>
          {activated ? "Ativado" : "Desativado" }
        </Badge>
      </td>
    </tr>
  )
}