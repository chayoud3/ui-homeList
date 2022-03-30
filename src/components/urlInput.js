import { Input, Button } from "antd";

const App = props => {

  const { url, port, setUrl, setPort, fetch } = props;

  return (
    <div className="section bg-light-blue">
      <div className="input-group">
        <span className="input-title">URL</span>
        <Input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)}/>
      </div>

      <div className="input-group">
        <span className="input-title">PORT</span>
        <Input placeholder="PORT" value={port} onChange={e => setPort(e.target.value)}/>
      </div>

      <div className="input-group">
        <Button type="primary" onClick={() => fetch()} >CONNECT</Button>
      </div>
    </div>
  )
};

export default App;