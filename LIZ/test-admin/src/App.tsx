import { Admin, Resource} from "react-admin";
import { dataProvider } from "./dataProvider";
import { UserCreate, UserEdit, UserList } from "./users";
import { PostEdit, PostList, PostCreate } from "./posts";
import { CommentCreate, CommentEdit, CommentList } from "./comments";
import { TodoCreate, TodoEdit, TodoList, TodoFilter } from "./todos";
import { authProvider } from "./AuthProvider";
import { Dashboard } from "./Dashboard";
import { AlbumList, AlbumEdit, AlbumCreate } from "./albums";
import { PhotoCreate, PhotoEdit, PhotoList } from "./photos";
import { i18nProvider } from './i18nProvider';
import UserIcon from "@mui/icons-material/Group";
import PostIcon from "@mui/icons-material/Article";
import CommentIcon from "@mui/icons-material/Comment";
import ToDoIcon from "@mui/icons-material/CheckBox";
import AlbumIcon from "@mui/icons-material/Album";
import PhotoIcon from "@mui/icons-material/Photo";

export const App = () => (
  <Admin dataProvider={dataProvider}
  authProvider={authProvider}
  dashboard={Dashboard}
  i18nProvider={i18nProvider}>
  
    <Resource name="users" 
    list={UserList}
    edit={UserEdit}
    create={UserCreate} 
    icon={UserIcon}
    options={{ label: 'Usuarios' }}/> 
    <Resource name="posts" 
    list={PostList}
    edit={PostEdit}
    create={PostCreate}  
    icon={PostIcon}
    options={{ label: 'Publicaciones' }}/> 
    <Resource name="comments" 
    list={CommentList} 
    edit={CommentEdit}
    create={CommentCreate}
    icon={CommentIcon}
    options={{ label: 'Comentarios' }}/>
    <Resource name="todos" 
    list={TodoList} 
    edit={TodoEdit}
    create={TodoCreate} 
    icon={ToDoIcon}
    options={{ label: 'Tareas' }}/>
    <Resource name="albums" 
    list={AlbumList}
    edit={AlbumEdit}
    create={AlbumCreate}
    icon={AlbumIcon}
    options={{ label: 'Álbumes' }}/>
    <Resource name="photos" 
    list={PhotoList}
    edit={PhotoEdit}
    create={PhotoCreate}
    icon={PhotoIcon}
    options={{ label: 'Fotos' }}/>
  </Admin>
);

