import { NavLink } from "react-router-dom";
import { Badge } from "reactstrap";
import { SearchItem } from ".";

interface CardItemProps {
  item: SearchItem;
}

export default function CardItem({ item }: CardItemProps) {
  const { id, query, maxPrice, minPrice, isActive } = item;
  
  return (
    <tr key={`item-${id}`} className="card-row">
      <td>
        <NavLink to={`/app/itemRegistry?id=${id}`}>
          {query}
        </NavLink>
      </td>
      <td className="text-center">
        {minPrice}
      </td>
      <td className="text-center">
        {maxPrice}
      </td>
      <td className="text-center">
        <Badge color={isActive ? "success" : "danger" }>
          {isActive ? "Ativado" : "Desativado" }
        </Badge>
      </td>
    </tr>
  )
}