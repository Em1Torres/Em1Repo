import { Admin, Resource} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserList } from "./users";
import { PostEdit, PostList, PostCreate } from "./posts";
import { CommentCreate, CommentEdit, CommentList } from "./comments";
import { TodoCreate, TodoEdit, TodoList } from "./todos";
import { authProvider } from "./AuthProvider";
import { Dashboard } from "./Dashboard";
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
import { PhotoCreate, PhotoEdit, PhotoList } from "./photos";

export const App = () => (
  <Admin dataProvider={dataProvider}
  authProvider={authProvider}
  dashboard={Dashboard}>
    <Resource name="users" list={UserList} /> 
    <Resource name="posts" 
    list={PostList}
    edit={PostEdit}
    create={PostCreate}  /> 
    <Resource name="comments" 
    list={CommentList} 
    edit={CommentEdit}
    create={CommentCreate}/>
    <Resource name="todos" 
    list={TodoList} 
    edit={TodoEdit}
    create={TodoCreate} />
    <Resource name="albums" 
    list={AlbumList}
    edit={AlbumEdit}
    create={AlbumCreate}/>
    <Resource name="photos" 
    list={PhotoList}
    edit={PhotoEdit}
    create={PhotoCreate}/>
  </Admin>
);

