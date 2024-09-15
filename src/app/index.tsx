import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ConfigProvider } from "antd";

import { RootState } from "src/store";
import router from "src/app/router";

const App = () => {

  const theme = useSelector((state: RootState) => state.theme)

  return (
    <ConfigProvider componentSize="middle" theme={theme.antConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App;