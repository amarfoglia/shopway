import React, { useState } from 'react';
import { FormControl, Grid, IconButton, Box } from '@material-ui/core';
import AddAPhotoOutlined from '@material-ui/icons/AddAPhotoOutlined';
import baseStyles from '../style/styles';
import { FastField } from 'formik';

interface Props {
  inputName: string;
  onImageUpload?: (image: File) => void;
  id: string;
}

const getImageURL = (file?: File) => file && URL.createObjectURL(file);

const ImageUploader: React.FC<Props> = ({ inputName, onImageUpload, id }) => {
  const [file, setFile] = useState<File>();
  const classes = baseStyles();

  const ImageButton = () => (
    <label htmlFor="button-file">
      <IconButton color="primary" component="span">
        <AddAPhotoOutlined />
      </IconButton>
    </label>
  );

  const PhotoPaper = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.photoPreview}
      style={{ backgroundImage: `url(${getImageURL(file)})` }}
    >
      {!file && <ImageButton />}
    </Box>
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const image = event.currentTarget?.files?.item(0);
    image && onImageUpload?.(image);
    image && setFile(image);
    console.log('modified');
  };

  return (
    <FormControl>
      <FastField
        name={inputName}
        accept="image/*"
        style={{ display: 'none' }}
        id={id}
        type="file"
        multiple
        onChange={handleChange}
      />
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <PhotoPaper />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default ImageUploader;
