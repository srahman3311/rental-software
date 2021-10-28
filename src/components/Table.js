//import { useEffect, useState } from "react";


export default function Table({ products }) {


    return (
        <table>
            <thead>
                <tr>
                    <th>SL</th>
                    <th>Name</th>
                    <th>type</th>
                    <th>Available</th>
                    <th>Need To Repair</th>
                    <th>Durability</th>
                    <th>Maximum Durability</th>
                    <th>Mileage</th>
                    <th>Price</th>
                    <th>Minimum Rent Period</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => {
                    return (
                        <tr key = {index + 1}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.type}</td>
                            <td>{product.availability.toString()}</td>
                            <td>{product.needing_repair.toString()}</td>
                            <td>{product.durability}</td>
                            <td>{product.max_durability}</td>
                            <td>{product.mileage}</td>
                            <td>{product.price}</td>
                            <td>{product.minimum_rent_period}</td>
                        </tr>
                    );
                })}           
            </tbody>
        </table>
    );
}