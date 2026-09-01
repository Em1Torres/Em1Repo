import { Create, DataTable, Edit, EditButton, EmailField, List, ReferenceInput, SelectInput, SimpleForm, SimpleList, TextInput, } from "react-admin";
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
                    <DataTable.Col source="postId" />
                    <DataTable.Col source="id" />
                    <DataTable.Col source="name" />
                    <DataTable.Col source="email" >
                        <EmailField source="email" />
                    </DataTable.Col>
                    <DataTable.Col source="body" />
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

            <TextInput required source="name" />

            <TextInput
                required
                source="email"
                type="email"
            />

            <TextInput
                required
                source="body"
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

            <TextInput required source="name" />

            <TextInput
                required
                source="email"
                type="email"
            />

            <TextInput
                required
                source="body"
                multiline
                rows={5}
            />
        </SimpleForm>
    </Create>
);