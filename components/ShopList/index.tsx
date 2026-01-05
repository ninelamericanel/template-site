"use client";

import { ICake } from "../../data/data-shop";
import Card from "../Card";

interface IProps {
  data: ICake[];
}
const ShopList = ({ data }: IProps) => {
  const renderData = data?.map((item, index) => {
    return (
      <div>
        <Card />
      </div>
    );
  });
  return renderData;
};

export default ShopList;
