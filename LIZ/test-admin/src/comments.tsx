import { Create, DataTable, Edit, EditButton, EmailField, List, ReferenceField, ReferenceInput, SelectInput, SimpleForm, SimpleList, TextInput, } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const CommentList = () => {
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down("sm")
    );

    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.name}
                    tertiaryText={(record) => record.body}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="postId" label="post">
                        <ReferenceField source="postId" reference="posts" link="show"/>
                    </DataTable.Col>
                    <DataTable.Col source="id" label="ID"/>
                    <DataTable.Col source="name" label="Nombre"/>
                    <DataTable.Col source="email" label="Email">
                        <EmailField source="email" />
                    </DataTable.Col>
                    <DataTable.Col source="body" label="Cuerpo"/>
                     <DataTable.Col>
                    <EditButton />
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
};



export const CommentEdit = () => (
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />

            <ReferenceInput source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>

            <TextInput required source="name" label="Nombre" />

            <TextInput
                required
                source="email"
                type="email"
                label="Correo"
            />

            <TextInput
                required
                source="body"
                label="Cuerpo"
                multiline
                rows={5}
            />
        </SimpleForm>
    </Edit>
);

export const CommentCreate = () => (
    <Create>
        <SimpleForm warnWhenUnsavedChanges>
            <ReferenceInput required source="postId" reference="posts">
                <SelectInput optionText="title" />
            </ReferenceInput>

            <TextInput required source="name" label="Nombre" />

            <TextInput
                required
                source="email"
                type="email"
                label="Correo"
            />

            <TextInput
                required
                source="body"
                multiline
                label="Cuerpo"
                rows={5}
            />
        </SimpleForm>
    </Create>
);