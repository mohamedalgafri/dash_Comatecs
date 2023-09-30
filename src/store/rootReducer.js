import counterReducers from "../pages/counter/counterSlice";
import postsReducers from "../pages/posts/postsSlice";
import auth from "../pages/auth/common/store";
import layout from "./layout";

const rootReducer = {
  layout,
  counter: counterReducers,
  posts: postsReducers,
  auth,
};
export default rootReducer;
