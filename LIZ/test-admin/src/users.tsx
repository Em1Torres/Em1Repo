import { List, 
    DataTable, EmailField, SimpleList, EditButton,
    Edit, Create, SimpleForm, TextInput } from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

export const UserList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText = {(record) => record.name}
          secondaryText = {(record) => record.username}
          tertiaryText = {(record) => record.email}
        />
      ) : (
        
        <DataTable>
          <DataTable.Col source="id" />
          <DataTable.Col source="name" label="nombre"/>
          <DataTable.Col source="username" label="usuario"/> 
          <DataTable.Col source="email" label="correo"/>
          <DataTable.Col source="address.city" label="ciudad"/>
          <DataTable.Col source="phone" label="telefono"/>
          <DataTable.Col source="website" label="sitio"/>
          <DataTable.Col source="company.name" label="compania"/>
          <DataTable.Col>
            <EditButton />
          </DataTable.Col>
        </DataTable>
      )}
    </List>
  );
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm warnWhenUnsavedChanges>
            <TextInput disabled source="id" />
            <TextInput required source="name" label="nombre"/>
            <TextInput required source="username" label="usuario"/>
            <TextInput required source="email" type="email" label="correo"/>
            <TextInput source="address.street" label="calle"/>
            <TextInput source="address.suite" label="hotel"/>
            <TextInput source="address.city" label="ciudad"/>
            <TextInput source="address.zipcode" label="codigo postal"/>
            <TextInput source="phone" label="telefono"/>
            <TextInput source="website" label="sitio web"/>
            <TextInput source="company.name" label="nombre de la compania"/>
            <TextInput source="company.catchPhrase" label="frase de captura"/>
        </SimpleForm>
    </Edit>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput required source="name" label="nombre"/>
            <TextInput required source="username" label="usuario"/>
            <TextInput required source="email" type="email" label="correo"/>
            <TextInput source="address.street" label="calle"/>
            <TextInput source="address.suite" label="hotel"/>
            <TextInput source="address.city" label="ciudad"/>
            <TextInput source="address.zipcode" label="codigo postal"/>
            <TextInput source="phone" label="telefono"/>
            <TextInput source="website" label="sitio web"/>
            <TextInput source="company.name" label="nombre de la compania"/>
            <TextInput source="company.catchPhrase" label="frase de captura"/>
        </SimpleForm>
    </Create>
);