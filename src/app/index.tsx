import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";

import { useAppSelector } from "src/store";
import router from "src/app/router";
import 'src/translate';

const App = () => {

  const theme = useAppSelector((state) => state.theme)

  return (
    <ConfigProvider componentSize="middle" theme={theme.antConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App;