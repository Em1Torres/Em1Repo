import { List, 
    DataTable, SimpleList, ReferenceField, EditButton, Edit, Create, ReferenceInput, TextInput, 
    SimpleForm} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const AlbumList = () =>{
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
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>

                    </DataTable>

                )
            }
        </List>
    );
}
export const AlbumEdit = () =>(
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
        </SimpleForm>
    </Edit>
);

export const AlbumCreate = () =>(
    <Create>
        <SimpleForm>
            <ReferenceInput required source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
        </SimpleForm>
    </Create>
);