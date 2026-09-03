import { List, 
    DataTable, SimpleList, ReferenceField, EditButton, Edit, Create, ReferenceInput, TextInput, 
    SimpleForm} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const PostList = () =>{
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText = {(record) => record.userId}
                    secondaryText = {(record) => record.title}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="userId" label="usuario">
                            <ReferenceField source="userId" reference="users" link="show"/> 
                        </DataTable.Col>
                        <DataTable.Col source="id" label="ID"/>
                        <DataTable.Col source="title" label="Título"/>
                        <DataTable.Col source="body" label="Cuerpo"/>
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>

                    </DataTable>

                )
            }
        </List>
    );
}
export const PostEdit = () =>(
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
            <TextInput source="body" label="Cuerpo"/>
        </SimpleForm>
    </Edit>
);

export const PostCreate = () =>(
    <Create>
        <SimpleForm>
            <ReferenceInput required source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
            <TextInput required source="body" label="Cuerpo" multiline rows={5} />
        </SimpleForm>
    </Create>
);