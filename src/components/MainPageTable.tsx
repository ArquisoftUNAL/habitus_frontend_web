// import { useEffect, useState } from "react"


export const MainPageTable = () => {
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - index);
    return day.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // const [users, setUsers] = useState([])

  // useEffect(() => {
   
  // }, [])



  return (
    <table className="table">
      <thead>
        <tr>
          {last7Days.map((day, index) => (
            <th key={index} scope="col">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};
