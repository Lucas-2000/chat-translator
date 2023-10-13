import { serverHttp } from "./http";

serverHttp.listen(3333, () => {
  console.log("Server is running on port 3333");
});
