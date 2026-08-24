import { Admin, Resource} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";
import { PostList } from "./posts";
import { CommentList } from "./comments";
import { TodoList } from "./todos";


export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} /> 
    <Resource name="posts" list={PostList} /> 
    <Resource name="comments" list={CommentList} />
    <Resource name="todos" list={TodoList} />
  </Admin>
);

