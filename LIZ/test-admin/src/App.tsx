import { Admin, Resource} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";
import { PostEdit, PostList, PostCreate } from "./posts";
import { CommentList } from "./comments";
import { TodoList } from "./todos";
import { authProvider } from "./AuthProvider";
import { Dashboard } from "./Dashboard";
//PostCreate

export const App = () => (
  <Admin dataProvider={dataProvider}
  authProvider={authProvider}
  dashboard={Dashboard}>
    <Resource name="users" list={UserList} /> 
    <Resource name="posts" 
    list={PostList}
    edit={PostEdit}
    create={PostCreate}  /> 
    <Resource name="comments" list={CommentList} />
    <Resource name="todos" list={TodoList} />
    
  </Admin>
);

