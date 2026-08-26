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
                        <DataTable.Col source="userId" />
                            <ReferenceField source="userId" reference="users" link="show"/>
                        <DataTable.Col source="id" />
                        <DataTable.Col source="title" />
                        <DataTable.Col source="body" />
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
            <TextInput required source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () =>(
    <Create>
        <SimpleForm>
            <ReferenceInput required source="userId" reference="users" />
            <TextInput required source="title" />
            <TextInput required source="body" multiline rows={5} />
        </SimpleForm>
    </Create>
);