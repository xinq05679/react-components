import BasicTemplate from "./template/BasicTemplate";
import TabPageExample from "./example/TabPageExample";

const App: React.FC = () => {
  return <BasicTemplate ContentPage={<TabPageExample />}></BasicTemplate>;
};

export default App;
