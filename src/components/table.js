import { Button } from "antd";

const App = props => {
  const { rows, columns, handleCreate } = props;

  const renderHead = () => {
    if (!columns || columns.length === 0)
      return;

    let responseList = [];
    for (let [i, column] of columns.entries()) {
      const key = `columns-` + i;
      responseList.push(<th key={key}>{column}</th>)
    }
    return <tr>{responseList}</tr>
  };

  const renderBody = () => {
    if (!rows || rows.length === 0)
      return;

    let responseList = [];
    for (let [i, row] of rows.entries()) {
      let colList = [];
      let rowData = Object.values(row);
      for (let [c, col] of rowData.entries()) {
        const key = `col-${i}-${c}`;
        colList.push(<td key={key}>{col}</td>)
      }

      const key = `col-${i}`;
      responseList.push(<tr key={key}>{colList}</tr>);
    }
    return responseList;
  };

  return (
    <>
      <div className="section">
        <div className="title">
          <span>HOUSE LIST</span>
          <Button className="btn-green" onClick={handleCreate}>CREATE</Button>
        </div>
      </div>

      <div className="section">
        <table className="table-container">
          <thead>{ renderHead() }</thead>
          <tbody>{ renderBody() }</tbody>
        </table>
      </div>

      <div className="section pagination">
        <div className="pagination-container">
          <span>Row per pages</span>
          <select></select>
          <span>1 - 5 of 8</span>
          <span>{"<"}</span>
          <span>1</span>
          <span>{">"}</span>
        </div>
      </div>
    </>
  )
};
App.defaultProps = { rows: [], columns: [] };
export default App;
