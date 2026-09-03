import { List, 
    DataTable, SimpleList, ReferenceField, EditButton, Edit, Create, ReferenceInput, TextInput, 
    SimpleForm} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const TodoList = () =>{
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={TodoFilter}>
            {isSmall ? (
                <SimpleList
                    primaryText = {(record) => record.title}
                />
                ) : (
                    <DataTable>
                        <DataTable.Col source="userId" label="usuario">
                            <ReferenceField source="userId" reference="users" link="show"/> 
                        </DataTable.Col>
                        <DataTable.Col source="id" label="ID"/>
                        <DataTable.Col source="title" label="Título"/>
                        <DataTable.Col source="completed" label="Completado"/>
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>
                    </DataTable>
                )
            }
        </List>
    );
}
export const TodoEdit = () =>(
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
            <TextInput source="completed" label="Completado"/>
        </SimpleForm>
    </Edit>
);
export const TodoCreate = () =>(
    <Create>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" label="Título"/>
            <TextInput source="completed" label="Completado"/>
        </SimpleForm>
    </Create>
);

export const TodoFilter = [
	<TextInput source="q" label="Search" alwaysOn />,
	<ReferenceInput source="userId" reference="users" alwaysOn />,
	<TextInput source="completed" label="Completado" />,
];