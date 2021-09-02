import { FormControl, Grid, IconButton, Box } from '@material-ui/core';
import AddAPhotoOutlined from '@material-ui/icons/AddAPhotoOutlined';
import React, { useState } from 'react';
import { CustomerFormModel } from '../../../model/auth';
import baseStyles from '../../../style/styles';

interface Props {
  formField: typeof CustomerFormModel.formField;
}

const getImageURL = (file?: File) => file && URL.createObjectURL(file);

const CustomerForm: React.FC<Props> = ({ formField: { photo } }) => {
  const [file, setFile] = useState<File>();
  const classes = baseStyles();

  const ImageButton = () => (
    <label htmlFor="button-file">
      <IconButton color="primary" component="span">
        <AddAPhotoOutlined />
      </IconButton>
    </label>
  );

  const AvatarPaper = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.avatarPreview}
      style={{ backgroundImage: `url(${getImageURL(file)})` }}
    >
      {!file && <ImageButton />}
    </Box>
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const image = event.currentTarget?.files?.item(0);
    image && setFile(image);
  };

  return (
    <FormControl>
      <input
        name={photo.name}
        accept="image/*"
        style={{ display: 'none' }}
        id="button-file"
        type="file"
        multiple
        onChange={handleChange}
      />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <AvatarPaper />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default CustomerForm;
