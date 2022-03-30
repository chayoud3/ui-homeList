import { Select } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const App = (props) => {
  const { average, median } = props;

  const [onFetch, setFetches] = useState(true);
  const [formData, setFormData] = useState({});
  const [postCodeOption, setPostCodeOption] = useState([]);

  const handleChangeSelect =  async (value = "") => {
    try {
      const url = `https://test-backend.baania.dev/postCode/${value}`;
      const { data } = await axios.get(url);
      setFormData(data?.payload);
    } catch (error) {
      setFormData({});
      console.log("error", error);
    }
  }

  const getInitialData = useCallback(async () => {
    try {
      const url = "https://test-backend.baania.dev/postCode";
      const { data } = await axios.get(url);
      setPostCodeOption(data?.payload.map(({ post_code }) => {
        const { Option } = Select;
        return <Option key={post_code} value={post_code} />
      }));
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    if (onFetch) getInitialData();

    return () => setFetches(false);
  }, [onFetch, getInitialData]);

  return (
    <div className="section">
      <div className="bg-light-blue post-code-container">
        <div>
          <Select
            showSearch
            defaultValue={"Please Select"}
            className="post-code-selector"
            onChange={value => handleChangeSelect(value)}
          >
            {postCodeOption}
          </Select>
        </div>

        <div className={`summarize-container ${ Object.keys(formData).length > 0 ? `active` : `` }`}>
          <table>
            <tbody>
              <tr>
                <th>Average</th>
                <th className="col-number">: {formData["average"]}</th>
              </tr>

              <tr>
                <th>Median</th>
                <th className="col-number">: {formData["median"]}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

App.defaultProps = { average: 0, median: 0 };

export default App;
